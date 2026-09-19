import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraButterflies = {
  id: "01a0b770-ba9d-79d9-8590-6f3ab69705af",
  type: "page-type/song",
  slug: "aurora-butterflies",
  title: "Butterflies",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
