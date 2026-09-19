import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSmallWonders = {
  id: "01a0b77c-f8a9-7ba0-b507-30cdf5a2d337",
  type: "page-type/song",
  slug: "paul-cardall-small-wonders",
  title: "Small Wonders",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
