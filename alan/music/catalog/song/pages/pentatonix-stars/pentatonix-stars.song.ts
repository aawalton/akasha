import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixStars = {
  id: "01a1546f-24f1-718a-8a6c-8323546fb285",
  type: "page-type/song",
  slug: "pentatonix-stars",
  title: "Stars",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
