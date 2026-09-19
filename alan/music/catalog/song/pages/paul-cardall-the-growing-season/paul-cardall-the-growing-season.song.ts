import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheGrowingSeason = {
  id: "01a0b77e-5eb6-7926-8dc9-34d5f5137209",
  type: "page-type/song",
  slug: "paul-cardall-the-growing-season",
  title: "The Growing Season",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
