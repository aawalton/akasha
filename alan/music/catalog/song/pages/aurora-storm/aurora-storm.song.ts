import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraStorm = {
  id: "01a0b770-d8b1-75a0-8dc6-475d9ff9fa78",
  type: "page-type/song",
  slug: "aurora-storm",
  title: "Storm",
  artist: "artist/aurora",
  performed: true,
  createdAt: "2026-09-19T02:13:41.169Z",
  updatedAt: "2026-09-19T02:15:26.000Z",
} as const satisfies Song
