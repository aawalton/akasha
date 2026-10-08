import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const auroraStarvation = {
  id: "01a0b770-d4fd-7fde-a377-dfdf32ea5193",
  type: "page-type/song",
  slug: "aurora-starvation",
  title: "Starvation",
  artist: "artist/aurora",
  performed: true,
  createdAt: "2026-09-19T02:13:40.221Z",
  updatedAt: "2026-09-19T02:15:26.000Z",
} as const satisfies Song
