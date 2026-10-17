import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const enyaFairytale = {
  id: "01a14a1d-db41-78a6-8b6f-989af5ca16e7",
  type: "page-type/song",
  slug: "enya-fairytale",
  title: "Fairytale",
  artist: "artist/enya",
  performed: true,
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Song
