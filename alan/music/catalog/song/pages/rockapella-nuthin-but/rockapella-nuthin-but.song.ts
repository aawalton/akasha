import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaNuthinBut = {
  id: "01a0d52b-52d9-7fb0-a31a-0acbac8bc71c",
  type: "page-type/song",
  slug: "rockapella-nuthin-but",
  title: "Nuthin' But",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
