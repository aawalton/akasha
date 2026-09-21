export const SPOTIFY_SCOPES: readonly string[] = [
  "user-top-read",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-modify-playback-state",
  "playlist-modify-private",
]

export const SPOTIFY_SCOPE_STRING: string = SPOTIFY_SCOPES.join(" ")
