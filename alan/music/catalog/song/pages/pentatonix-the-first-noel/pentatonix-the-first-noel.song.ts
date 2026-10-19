import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixTheFirstNoel = {
  id: "01a1546f-24f1-791d-b05b-67aa021352bc",
  type: "page-type/song",
  slug: "pentatonix-the-first-noel",
  title: "The First Noel",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
