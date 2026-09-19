import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyInDaTub = {
  id: "01a0b77f-f47a-7527-90a8-f09b789fc2c0",
  type: "page-type/song",
  slug: "the-holderness-family-in-da-tub",
  title: "In Da Tub",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
