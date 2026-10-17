import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const enyaTheHumming = {
  id: "01a14a1d-db45-78af-b191-6ba5926f50b3",
  type: "page-type/song",
  slug: "enya-the-humming",
  title: "The Humming",
  artist: "artist/enya",
  performed: true,
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Song
