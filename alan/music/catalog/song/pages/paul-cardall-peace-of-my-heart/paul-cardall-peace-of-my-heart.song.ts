import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallPeaceOfMyHeart = {
  id: "01a0b77d-c1c0-7d62-954a-cfcddf9bdd2b",
  type: "page-type/song",
  slug: "paul-cardall-peace-of-my-heart",
  title: "Peace Of My Heart",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
