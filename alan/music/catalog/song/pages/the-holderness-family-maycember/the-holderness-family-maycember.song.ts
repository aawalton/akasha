import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyMaycember = {
  id: "01a0b77f-08ae-7c68-88ba-524799aa1668",
  type: "page-type/song",
  slug: "the-holderness-family-maycember",
  title: "Maycember",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
