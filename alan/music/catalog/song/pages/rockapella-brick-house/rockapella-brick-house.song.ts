import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaBrickHouse = {
  id: "01a0d52b-52d7-764c-b89f-079afb406070",
  type: "page-type/song",
  slug: "rockapella-brick-house",
  title: "Brick House",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
