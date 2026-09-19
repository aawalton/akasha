import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallWhereTheresLove = {
  id: "01a0b77a-03ee-7c04-933e-df0d8f38859d",
  type: "page-type/song",
  slug: "paul-cardall-where-theres-love",
  title: "Where There's Love",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
