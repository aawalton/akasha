import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaMillennialLady = {
  id: "01a0d52b-52d9-7ee4-8c7b-0e57970ffbc4",
  type: "page-type/song",
  slug: "rockapella-millennial-lady",
  title: "Millennial Lady",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
