import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixNaNaNa = {
  id: "01a1546f-24ef-73ed-bf95-b5101720648d",
  type: "page-type/song",
  slug: "pentatonix-na-na-na",
  title: "Na Na Na",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
