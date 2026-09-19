import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jeffGoldblumASentimentalMan = {
  id: "01a0b7a7-0a9b-75a1-9c6d-bfe7105be770",
  type: "page-type/song",
  slug: "jeff-goldblum-a-sentimental-man",
  title: "A Sentimental Man",
  artist: "artist/jeff-goldblum",
  performed: true,
} as const satisfies Song
