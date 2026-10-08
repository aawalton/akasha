import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleFirstLove = {
  id: "01a0d52b-c259-7839-97f7-2dca9f6e4a1c",
  type: "page-type/song",
  slug: "adele-first-love",
  title: "First Love",
  artist: "artist/adele",
  performed: true,
  createdAt: "2026-09-24T20:46:49.945Z",
  updatedAt: "2026-09-24T20:46:51.000Z",
} as const satisfies Song
