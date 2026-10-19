import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixGangnamStyle = {
  id: "01a1546f-24ed-7a1e-9fe5-7a84165106dd",
  type: "page-type/song",
  slug: "pentatonix-gangnam-style",
  title: "Gangnam Style",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
