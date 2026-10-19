import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixHappyNow = {
  id: "01a1546f-24ed-77c2-bfb9-33222bb0e509",
  type: "page-type/song",
  slug: "pentatonix-happy-now",
  title: "Happy Now",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
