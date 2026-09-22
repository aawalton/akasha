import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lynLapidCoraline = {
  id: "01a0c95e-ab15-75d5-aa68-2c4aa1825867",
  type: "page-type/song",
  slug: "lyn-lapid-coraline",
  title: "coraline",
  artist: "artist/lyn-lapid",
  performed: true,
} as const satisfies Song
