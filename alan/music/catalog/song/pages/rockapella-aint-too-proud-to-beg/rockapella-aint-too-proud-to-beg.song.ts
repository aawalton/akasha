import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaAintTooProudToBeg = {
  id: "01a0d52b-52d7-7926-b60c-48d0b01a9d2e",
  type: "page-type/song",
  slug: "rockapella-aint-too-proud-to-beg",
  title: "Ain't Too Proud to Beg",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
