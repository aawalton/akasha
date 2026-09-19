import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyItsNotRice = {
  id: "01a0b77f-ad75-7ca8-bc11-2529fb17f2c5",
  type: "page-type/song",
  slug: "the-holderness-family-its-not-rice",
  title: "It's Not Rice",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
