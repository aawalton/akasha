import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixSaySomething = {
  id: "01a1546f-24f0-773e-8709-0e190480017d",
  type: "page-type/song",
  slug: "pentatonix-say-something",
  title: "Say Something",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
