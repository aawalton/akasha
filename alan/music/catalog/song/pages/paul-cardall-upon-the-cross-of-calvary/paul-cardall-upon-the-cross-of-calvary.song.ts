import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallUponTheCrossOfCalvary = {
  id: "01a0b779-cb87-7251-8d3c-111da5e7c006",
  type: "page-type/song",
  slug: "paul-cardall-upon-the-cross-of-calvary",
  title: "Upon the Cross of Calvary",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
