import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixSide = {
  id: "01a1546f-24f0-7074-82db-60f33d9be57a",
  type: "page-type/song",
  slug: "pentatonix-side",
  title: "Side",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
