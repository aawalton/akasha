import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallFaithInSpring = {
  id: "01a0b77e-d417-7c27-94d2-90750680e1b8",
  type: "page-type/song",
  slug: "paul-cardall-faith-in-spring",
  title: "Faith In Spring",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
