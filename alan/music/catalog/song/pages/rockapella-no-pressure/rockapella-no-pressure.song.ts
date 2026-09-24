import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaNoPressure = {
  id: "01a0d52b-52d9-7e10-909e-d3208e93b656",
  type: "page-type/song",
  slug: "rockapella-no-pressure",
  title: "No Pressure",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
