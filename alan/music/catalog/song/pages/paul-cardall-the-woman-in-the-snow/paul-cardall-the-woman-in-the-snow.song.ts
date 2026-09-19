import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheWomanInTheSnow = {
  id: "01a0b77d-eb70-70ec-a86f-893059929399",
  type: "page-type/song",
  slug: "paul-cardall-the-woman-in-the-snow",
  title: "The Woman in the Snow",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
