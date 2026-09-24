import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaWhereInTheWorldIsCarmenSandiego = {
  id: "01a0d52b-52da-7450-9b7b-6ef5ff061476",
  type: "page-type/song",
  slug: "rockapella-where-in-the-world-is-carmen-sandiego",
  title: "Where in the World Is Carmen Sandiego?",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
