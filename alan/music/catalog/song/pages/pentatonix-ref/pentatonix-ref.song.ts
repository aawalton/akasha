import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixRef = {
  id: "01a1546f-24f0-7d21-9d62-adbb1c5843d3",
  type: "page-type/song",
  slug: "pentatonix-ref",
  title: "Ref",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
