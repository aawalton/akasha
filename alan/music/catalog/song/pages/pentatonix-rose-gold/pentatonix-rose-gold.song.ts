import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixRoseGold = {
  id: "01a1546f-24f0-722d-a1d1-c11213e9f95d",
  type: "page-type/song",
  slug: "pentatonix-rose-gold",
  title: "Rose Gold",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
