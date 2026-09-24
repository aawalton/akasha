import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaTheShortestPath = {
  id: "01a0d52b-52da-751c-befa-a82d59cae7f0",
  type: "page-type/song",
  slug: "rockapella-the-shortest-path",
  title: "The Shortest Path",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
