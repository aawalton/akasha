import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaFireAndIce = {
  id: "01a0b76f-d2c8-7532-aae2-88f003a0e287",
  type: "page-type/song",
  slug: "alexandria-fire-and-ice",
  title: "Fire and Ice",
  artist: "artist/alexandria",
  performed: true,
} as const satisfies Song
