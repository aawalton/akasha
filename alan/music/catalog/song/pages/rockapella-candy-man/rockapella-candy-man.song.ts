import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaCandyMan = {
  id: "01a0d52b-52d7-7739-8443-efeab0ce75ef",
  type: "page-type/song",
  slug: "rockapella-candy-man",
  title: "Candy Man",
  artist: "artist/rockapella",
  performed: true,
  createdAt: "2026-09-24T20:46:21.399Z",
  updatedAt: "2026-09-24T20:46:23.000Z",
} as const satisfies Song
