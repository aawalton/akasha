import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixSnow = {
  id: "01a1546f-24f0-79e9-acd8-4e5ba404f161",
  type: "page-type/song",
  slug: "pentatonix-snow",
  title: "Snow",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
