import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleHello = {
  id: "01a0d52b-c259-7a84-b1c0-567f2d538c69",
  type: "page-type/song",
  slug: "adele-hello",
  title: "Hello",
  artist: "artist/adele",
  performed: true,
  createdAt: "2026-09-24T20:46:49.945Z",
  updatedAt: "2026-09-24T20:46:51.000Z",
} as const satisfies Song
