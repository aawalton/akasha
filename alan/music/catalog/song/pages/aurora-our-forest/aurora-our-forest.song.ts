import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraOurForest = {
  id: "01a0b770-ff95-7ece-b1f2-105c64b710fe",
  type: "page-type/song",
  slug: "aurora-our-forest",
  title: "Our Forest",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
