import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaChristmasAltogether = {
  id: "01a0d52b-52d8-7c2d-be09-7bdfc26b3f9e",
  type: "page-type/song",
  slug: "rockapella-christmas-altogether",
  title: "Christmas Altogether",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
