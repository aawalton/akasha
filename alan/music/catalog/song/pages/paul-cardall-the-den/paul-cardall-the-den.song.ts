import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheDen = {
  id: "01a0b77e-c707-7c15-8064-4d9698223016",
  type: "page-type/song",
  slug: "paul-cardall-the-den",
  title: "The Den",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
