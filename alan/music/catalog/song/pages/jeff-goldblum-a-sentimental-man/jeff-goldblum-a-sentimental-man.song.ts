import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jeffGoldblumASentimentalMan = {
  id: "01a0b7a7-0a9b-75a1-9c6d-bfe7105be770",
  type: "page-type/song",
  slug: "jeff-goldblum-a-sentimental-man",
  title: "A Sentimental Man",
  artist: "artist/jeff-goldblum",
  performed: true,
  createdAt: "2026-09-19T03:12:52.891Z",
  updatedAt: "2026-09-19T03:13:04.000Z",
} as const satisfies Song
