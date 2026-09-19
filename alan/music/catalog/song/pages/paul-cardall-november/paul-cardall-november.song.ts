import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallNovember = {
  id: "01a0b77d-3503-7ff3-bdf8-19d11449b3b6",
  type: "page-type/song",
  slug: "paul-cardall-november",
  title: "November",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
