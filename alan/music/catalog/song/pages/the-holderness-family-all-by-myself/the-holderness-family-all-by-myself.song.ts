import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyAllByMyself = {
  id: "01a0b77f-db75-7712-9af6-8b894c60a332",
  type: "page-type/song",
  slug: "the-holderness-family-all-by-myself",
  title: "All by Myself",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
