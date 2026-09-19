import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraTheSeedOutro = {
  id: "01a0b770-d0e5-7797-b908-5567deeb23a7",
  type: "page-type/song",
  slug: "aurora-the-seed-outro",
  title: "The Seed Outro",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
