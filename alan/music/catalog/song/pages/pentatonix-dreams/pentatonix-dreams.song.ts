import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixDreams = {
  id: "01a1546f-24ec-7612-bd78-98537443e9d4",
  type: "page-type/song",
  slug: "pentatonix-dreams",
  title: "Dreams",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
