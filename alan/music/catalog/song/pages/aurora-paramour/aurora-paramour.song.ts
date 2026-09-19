import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraParamour = {
  id: "01a0b770-c0a9-71ec-86e9-9e2e31ba21ad",
  type: "page-type/song",
  slug: "aurora-paramour",
  title: "PARAMOUR",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
