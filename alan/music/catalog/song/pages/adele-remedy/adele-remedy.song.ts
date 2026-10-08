import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleRemedy = {
  id: "01a0d52b-c259-7ee5-a615-11e15722ced5",
  type: "page-type/song",
  slug: "adele-remedy",
  title: "Remedy",
  artist: "artist/adele",
  performed: true,
  createdAt: "2026-09-24T20:46:49.945Z",
  updatedAt: "2026-09-24T20:46:51.000Z",
} as const satisfies Song
