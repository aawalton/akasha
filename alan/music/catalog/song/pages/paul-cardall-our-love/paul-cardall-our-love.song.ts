import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallOurLove = {
  id: "01a0b77d-3641-794c-bbab-10c8880e24b6",
  type: "page-type/song",
  slug: "paul-cardall-our-love",
  title: "Our Love",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
