import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheFirstGift = {
  id: "01a0b77e-c82c-73e8-9daf-35167263922b",
  type: "page-type/song",
  slug: "paul-cardall-the-first-gift",
  title: "The First Gift",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
