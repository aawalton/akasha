import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleSweetestDevotion = {
  id: "01a0d52b-c259-7ab4-938a-1f403e793cfb",
  type: "page-type/song",
  slug: "adele-sweetest-devotion",
  title: "Sweetest Devotion",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
