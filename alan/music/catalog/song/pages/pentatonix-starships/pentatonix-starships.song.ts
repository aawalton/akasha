import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixStarships = {
  id: "01a1546f-24f1-7d66-b23d-90a5b23df84f",
  type: "page-type/song",
  slug: "pentatonix-starships",
  title: "Starships",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
