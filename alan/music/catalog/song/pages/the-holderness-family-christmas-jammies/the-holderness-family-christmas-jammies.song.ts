import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyChristmasJammies = {
  id: "01a0b77f-ee81-75f2-94d6-c5bad232f5b5",
  type: "page-type/song",
  slug: "the-holderness-family-christmas-jammies",
  title: "Christmas Jammies",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
