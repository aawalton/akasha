import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaFireAndIce = {
  id: "01a0b76f-d2c8-7532-aae2-88f003a0e287",
  type: "page-type/song",
  slug: "alexandria-fire-and-ice",
  title: "Fire and Ice",
  artist: "artist/alexandria",
  performed: true,
  createdAt: "2026-09-19T02:12:34.120Z",
  updatedAt: "2026-09-19T02:13:10.000Z",
} as const satisfies Song
