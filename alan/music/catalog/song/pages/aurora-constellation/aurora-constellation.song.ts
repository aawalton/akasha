import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraConstellation = {
  id: "01a0b770-c902-79ec-b0e1-4269c11c5f5d",
  type: "page-type/song",
  slug: "aurora-constellation",
  title: "Constellation",
  artist: "artist/aurora",
  performed: true,
} as const satisfies Song
