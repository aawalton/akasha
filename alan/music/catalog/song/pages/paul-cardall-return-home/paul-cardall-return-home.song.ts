import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallReturnHome = {
  id: "01a0b77e-7b8d-7b7d-99b3-d13d7f18459c",
  type: "page-type/song",
  slug: "paul-cardall-return-home",
  title: "Return Home",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
