import type { Playlist } from "akasha/alan/music/choosing/playlist/playlist.page-type.types.ts"

export const ungraded = {
  id: "01a0c584-b63e-7603-a2fb-f3a4408769d5",
  type: "page-type/playlist",
  slug: "ungraded",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1O7t6LaH38jExi1Z5LFNUV",
      externalLink: "https://open.spotify.com/playlist/1O7t6LaH38jExi1Z5LFNUV",
    },
  ],
} as const satisfies Playlist
