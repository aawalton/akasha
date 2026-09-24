import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaAngelsWeHaveHeardOnHigh = {
  id: "01a0d52b-52d7-7f40-b709-06c418e36805",
  type: "page-type/song",
  slug: "rockapella-angels-we-have-heard-on-high",
  title: "Angels We Have Heard On High",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
