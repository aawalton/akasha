import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaWhatLoversDo = {
  id: "01a0d52b-52da-77e9-9620-bb524dacbbe5",
  type: "page-type/song",
  slug: "rockapella-what-lovers-do",
  title: "What Lovers Do",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
