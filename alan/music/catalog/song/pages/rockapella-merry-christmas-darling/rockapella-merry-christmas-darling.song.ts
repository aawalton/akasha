import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaMerryChristmasDarling = {
  id: "01a0d52b-52d9-70ed-9607-6c0e7ec4c56b",
  type: "page-type/song",
  slug: "rockapella-merry-christmas-darling",
  title: "Merry Christmas Darling",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
