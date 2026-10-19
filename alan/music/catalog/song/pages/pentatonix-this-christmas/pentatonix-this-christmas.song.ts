import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const pentatonixThisChristmas = {
  id: "01a1546f-24f1-779c-a566-3808f9ed4a38",
  type: "page-type/song",
  slug: "pentatonix-this-christmas",
  title: "This Christmas",
  artist: "artist/pentatonix",
  performed: true,
  createdAt: "2026-10-19T13:52:12.521Z",
  updatedAt: "2026-10-19T13:52:12.521Z",
} as const satisfies Song
