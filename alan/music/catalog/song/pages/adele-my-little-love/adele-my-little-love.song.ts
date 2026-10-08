import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleMyLittleLove = {
  id: "01a0d52b-c259-7c17-990e-8737c4016b36",
  type: "page-type/song",
  slug: "adele-my-little-love",
  title: "My Little Love",
  artist: "artist/adele",
  performed: true,
  createdAt: "2026-09-24T20:46:49.945Z",
  updatedAt: "2026-09-24T20:46:51.000Z",
} as const satisfies Song
