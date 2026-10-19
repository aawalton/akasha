import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixSing = {
  id: "01a1546f-24f0-74c4-a60a-e532907e7b4b",
  type: "page-type/song",
  slug: "pentatonix-sing",
  title: "Sing",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
