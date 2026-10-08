import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaTightPants = {
  id: "01a0d52b-52da-7efa-9145-c3049e2b36fa",
  type: "page-type/song",
  slug: "rockapella-tight-pants",
  title: "Tight Pants",
  artist: "artist/rockapella",
  performed: true,
  createdAt: "2026-09-24T20:46:21.402Z",
  updatedAt: "2026-09-24T20:46:23.000Z",
} as const satisfies Song
