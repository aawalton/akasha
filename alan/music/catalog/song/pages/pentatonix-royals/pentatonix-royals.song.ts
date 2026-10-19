import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixRoyals = {
  id: "01a1546f-24f0-7d5b-8f9f-47954957a51d",
  type: "page-type/song",
  slug: "pentatonix-royals",
  title: "Royals",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
