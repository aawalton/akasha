import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaTooMuch = {
  id: "01a0d52b-52da-7508-9b04-5821c2057e18",
  type: "page-type/song",
  slug: "rockapella-too-much",
  title: "Too Much",
  artist: "artist/rockapella",
  performed: true,
  createdAt: "2026-09-24T20:46:21.402Z",
  updatedAt: "2026-09-24T20:46:23.000Z",
} as const satisfies Song
