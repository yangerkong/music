import uuid from 'uuid/v1'

export default {
    namespaced: true,
    state: {
        offline_playlist: []
    },
    mutations: {
        update(state, val) {
            state.offline_playlist = val || []
        },
        add(state, name) {
            state.offline_playlist.push({
                id: uuid(),
                name
            })
            localStorage.setItem('offline_playlist', JSON.stringify(state.offline_playlist))
        },
        rename(state, {id, name}) {
            for (let item of state.offline_playlist) {
                if (item.id === id) {
                    item.name = name
                    break
                }
            }
            localStorage.setItem('offline_playlist', JSON.stringify(state.offline_playlist))
        },
        del(state, id) {
            for (let i in state.offline_playlist) {
                if (state.offline_playlist[i].id === id) {
                    state.offline_playlist.splice(i, 1)
                    break
                }
            }
            localStorage.setItem('offline_playlist', JSON.stringify(state.offline_playlist))
            localStorage.removeItem(`offline_playlist_${id}_song`)
        }
    },
    actions: {
        init({commit}) {
            commit('update', JSON.parse(localStorage.getItem('offline_playlist')))
        }
    }
}
