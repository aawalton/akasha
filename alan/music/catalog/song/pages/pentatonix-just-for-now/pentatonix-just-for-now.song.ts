import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixJustForNow = {
  id: "01a1546f-24ee-7ca7-8bb2-d694cf1fc760",
  type: "page-type/song",
  slug: "pentatonix-just-for-now",
  title: "Just For Now",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
