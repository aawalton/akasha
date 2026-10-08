import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaBrickHouse = {
  id: "01a0d52b-52d7-764c-b89f-079afb406070",
  type: "page-type/song",
  slug: "rockapella-brick-house",
  title: "Brick House",
  artist: "artist/rockapella",
  performed: true,
  createdAt: "2026-09-24T20:46:21.399Z",
  updatedAt: "2026-09-24T20:46:23.000Z",
} as const satisfies Song
