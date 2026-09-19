import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallDeeper = {
  id: "01a0b77e-9ee4-74bc-8bb0-93a2a31c566c",
  type: "page-type/song",
  slug: "paul-cardall-deeper",
  title: "Deeper",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
