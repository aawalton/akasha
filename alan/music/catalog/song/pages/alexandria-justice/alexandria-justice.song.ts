import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexandriaJustice = {
  id: "01a0b76f-d3ef-7fe0-9c25-8df24eab082b",
  type: "page-type/song",
  slug: "alexandria-justice",
  title: "Justice",
  artist: "artist/alexandria",
  performed: true,
} as const satisfies Song
