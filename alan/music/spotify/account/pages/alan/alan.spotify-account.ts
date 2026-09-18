import type { SpotifyAccount } from "akasha/alan/music/spotify/account/spotify-account.page-type.types.ts"

export const alan = {
  id: "01a0b6dc-ce7f-73a5-9ed6-f3e8fcb69596",
  type: "page-type/spotify-account",
  slug: "alan",
  redirectUri: "https://alanwalton.com/api/spotify/callback",
} as const satisfies SpotifyAccount
