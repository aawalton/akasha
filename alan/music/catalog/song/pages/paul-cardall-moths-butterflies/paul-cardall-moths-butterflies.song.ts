import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallMothsButterflies = {
  id: "01a0b77e-b1c6-7c02-87ca-91a323357254",
  type: "page-type/song",
  slug: "paul-cardall-moths-butterflies",
  title: "Moths & Butterflies",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
