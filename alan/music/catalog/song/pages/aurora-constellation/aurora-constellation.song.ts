import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraConstellation = {
  id: "01a0b770-c902-79ec-b0e1-4269c11c5f5d",
  type: "page-type/song",
  slug: "aurora-constellation",
  title: "Constellation",
  artist: "artist/aurora",
  performed: true,
  createdAt: "2026-09-19T02:13:37.154Z",
  updatedAt: "2026-09-19T02:15:26.000Z",
} as const satisfies Song
