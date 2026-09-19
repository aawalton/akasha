import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSimpleGifts = {
  id: "01a0b779-ee5f-74a4-8285-ea61b34af497",
  type: "page-type/song",
  slug: "paul-cardall-simple-gifts",
  title: "Simple Gifts",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
