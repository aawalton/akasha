import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixFirst = {
  id: "01a1546f-24ed-7c4b-9c67-350b0df20809",
  type: "page-type/song",
  slug: "pentatonix-first",
  title: "First",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
