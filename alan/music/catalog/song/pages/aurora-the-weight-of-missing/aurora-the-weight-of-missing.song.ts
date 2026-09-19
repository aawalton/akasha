import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheWeightOfMissing = {
  id: "01a0b770-f3ed-7cba-afde-31c5a3102da7",
  type: "page-type/song",
  slug: "aurora-the-weight-of-missing",
  title: "The Weight Of Missing",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
