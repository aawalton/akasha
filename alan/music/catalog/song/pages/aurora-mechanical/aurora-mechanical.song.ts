import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraMechanical = {
  id: "01a0b770-fd43-7490-a587-23ed67984fe7",
  type: "page-type/song",
  slug: "aurora-mechanical",
  title: "Mechanical",
  artist: "artist/aurora",
  performed: true,
  createdAt: "2026-09-19T02:13:50.531Z",
  updatedAt: "2026-09-19T02:15:26.000Z",
} as const satisfies Song
