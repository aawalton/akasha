import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixPetals = {
  id: "01a1546f-24ef-781f-94ad-fe8f0ca3f385",
  type: "page-type/song",
  slug: "pentatonix-petals",
  title: "Petals",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
