import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraAPlaceToCallHome = {
  id: "01a0b771-0a67-741e-8cab-a39156097590",
  type: "page-type/song",
  slug: "aurora-a-place-to-call-home",
  title: "A Place To Call Home",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
