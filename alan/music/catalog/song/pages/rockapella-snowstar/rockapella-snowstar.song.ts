import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaSnowstar = {
  id: "01a0d52b-52d9-79e1-98fb-0dec98a39a09",
  type: "page-type/song",
  slug: "rockapella-snowstar",
  title: "Snowstar",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
