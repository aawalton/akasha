import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWalkingMyBabyBackHome = {
  id: "01a0b779-6e38-78dd-911b-9222d59d540e",
  type: "page-type/song",
  slug: "james-taylor-walking-my-baby-back-home",
  title: "Walking My Baby Back Home",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
