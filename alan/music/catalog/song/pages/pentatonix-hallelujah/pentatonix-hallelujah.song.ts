import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixHallelujah = {
  id: "01a1546f-24ed-7e00-a192-8efde5826f97",
  type: "page-type/song",
  slug: "pentatonix-hallelujah",
  title: "Hallelujah",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
