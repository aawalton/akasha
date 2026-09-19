import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraMebhsTune = {
  id: "01a0b770-fc16-7870-a925-9a8d5174f39f",
  type: "page-type/song",
  slug: "aurora-mebhs-tune",
  title: "Mébh's Tune",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
