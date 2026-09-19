import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanFollowMe = {
  id: "01a0b771-4cb7-7d76-8b30-423dfc60d1f3",
  type: "page-type/song",
  slug: "celtic-woman-follow-me",
  title: "Follow Me",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
