import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixSweet = {
  id: "01a1546f-24f1-7549-8262-85ecc2357c81",
  type: "page-type/song",
  slug: "pentatonix-sweet",
  title: "Sweet",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
