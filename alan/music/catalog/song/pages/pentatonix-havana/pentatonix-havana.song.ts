import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixHavana = {
  id: "01a1546f-24ed-79bb-9f2b-3607acfa9403",
  type: "page-type/song",
  slug: "pentatonix-havana",
  title: "Havana",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
