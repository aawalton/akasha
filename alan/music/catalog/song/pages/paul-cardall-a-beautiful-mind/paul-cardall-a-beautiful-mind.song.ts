import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallABeautifulMind = {
  id: "01a0b77e-a59a-710d-88a6-250e007aea20",
  type: "page-type/song",
  slug: "paul-cardall-a-beautiful-mind",
  title: "A Beautiful Mind",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
