import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallIBelieveInChrist = {
  id: "01a0b77e-74e8-7355-a142-8a66a9729a64",
  type: "page-type/song",
  slug: "paul-cardall-i-believe-in-christ",
  title: "I Believe In Christ",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
