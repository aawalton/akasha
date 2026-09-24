import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaDespacito = {
  id: "01a0d52b-52d8-7fad-aa82-d4cd7ec668e4",
  type: "page-type/song",
  slug: "rockapella-despacito",
  title: "Despacito",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
