import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallComingHome = {
  id: "01a0b77d-d9ec-7bfb-b5af-006ceba7bf31",
  type: "page-type/song",
  slug: "paul-cardall-coming-home",
  title: "Coming Home",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
