import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaShemibos = {
  id: "01a0d52b-52d9-75d3-b5c8-8106de0068df",
  type: "page-type/song",
  slug: "rockapella-shemibos",
  title: "Shemibos",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
