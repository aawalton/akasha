import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixHome = {
  id: "01a1546f-24ed-7885-82a6-b3413628ba27",
  type: "page-type/song",
  slug: "pentatonix-home",
  title: "Home",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
