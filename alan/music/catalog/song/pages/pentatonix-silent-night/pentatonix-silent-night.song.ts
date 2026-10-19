import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixSilentNight = {
  id: "01a1546f-24f0-7f53-a0bd-b7c37870e68c",
  type: "page-type/song",
  slug: "pentatonix-silent-night",
  title: "Silent Night",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
