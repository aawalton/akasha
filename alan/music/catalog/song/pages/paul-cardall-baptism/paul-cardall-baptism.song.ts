import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallBaptism = {
  id: "01a0b77e-6451-741b-8118-0f9ef87accd2",
  type: "page-type/song",
  slug: "paul-cardall-baptism",
  title: "Baptism",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
