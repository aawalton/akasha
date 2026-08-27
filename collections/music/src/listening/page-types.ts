export const SONG_LISTEN_SLUG = "song-listen"
export const HEARD_TRACK_SLUG = "heard-track"
export const MUSIC_DAY_SLUG = "music-day"
export const HEARD_MUSIC_SLUG = "heard-music"

export const NEWEST_PLAY_QUERY = "song-listen-newest"
export const PLAY_BY_KEY_QUERY = "song-listen-by-play-key"
export const HEARD_BY_SPOTIFY_ID_QUERY = "heard-track-by-spotify-id"
export const HEARD_BY_TITLE_KEY_QUERY = "heard-track-by-title-key"

export const HEARD_SOURCES = {
  observed: "observed",
  seedTopTracks: "seed-top-tracks",
  seedRated: "seed-rated",
  seedPriorWindow: "seed-prior-window",
} as const

export type HeardSource = (typeof HEARD_SOURCES)[keyof typeof HEARD_SOURCES]
