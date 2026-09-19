import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSignOfTheTimes = {
  id: "01a0b77e-98c1-76fa-80af-14c37020beeb",
  type: "page-type/song",
  slug: "paul-cardall-sign-of-the-times",
  title: "Sign of the Times",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
