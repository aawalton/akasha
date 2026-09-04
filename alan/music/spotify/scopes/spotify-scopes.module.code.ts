export const SPOTIFY_SCOPES: readonly string[] = [
  "user-read-private",
  "user-read-email",
  "user-top-read",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-read-currently-playing",
  "user-library-read",
  "user-follow-read",
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
  "user-library-modify",
  "user-follow-modify",
  "user-modify-playback-state",
  "ugc-image-upload",
]

export const SPOTIFY_SCOPE_STRING: string = SPOTIFY_SCOPES.join(" ")
