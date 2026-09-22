import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lynLapidForecast = {
  id: "01a0c95e-ac6b-7948-a2e1-b44729ee5ad9",
  type: "page-type/song",
  slug: "lyn-lapid-forecast",
  title: "forecast",
  artist: "artist/lyn-lapid",
  performed: true,
} as const satisfies Song
