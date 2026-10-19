import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixRave = {
  id: "01a1546f-24ef-725d-852c-93b0b66df404",
  type: "page-type/song",
  slug: "pentatonix-rave",
  title: "Rave",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
