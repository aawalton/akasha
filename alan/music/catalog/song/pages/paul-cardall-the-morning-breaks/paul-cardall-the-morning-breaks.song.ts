import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheMorningBreaks = {
  id: "01a0b779-c552-7d2e-997c-aee1713843d0",
  type: "page-type/song",
  slug: "paul-cardall-the-morning-breaks",
  title: "The Morning Breaks",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
