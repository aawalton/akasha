import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lynLapidMyLittleIsland = {
  id: "01a0c95e-c05f-7c20-b5f8-0550adcad0d0",
  type: "page-type/song",
  slug: "lyn-lapid-my-little-island",
  title: "My Little Island",
  artist: "artist/lyn-lapid",
  performed: true,
} as const satisfies Song
