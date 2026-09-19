import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallFathersAndDaughters = {
  id: "01a0b77e-7376-7e83-a182-5295e76f6460",
  type: "page-type/song",
  slug: "paul-cardall-fathers-and-daughters",
  title: "Fathers and Daughters",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
