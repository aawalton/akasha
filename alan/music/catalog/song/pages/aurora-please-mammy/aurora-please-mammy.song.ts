import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraPleaseMammy = {
  id: "01a0b771-020a-733e-8d4f-2e80d1864a86",
  type: "page-type/song",
  slug: "aurora-please-mammy",
  title: "Please Mammy",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
