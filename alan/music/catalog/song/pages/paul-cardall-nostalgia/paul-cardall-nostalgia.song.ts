import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallNostalgia = {
  id: "01a0b77e-d573-742b-9cea-7bea258e2f49",
  type: "page-type/song",
  slug: "paul-cardall-nostalgia",
  title: "Nostalgia",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
