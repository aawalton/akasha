import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheChristmasBox = {
  id: "01a0b77e-c5d5-7b5c-b0b7-a7dcf760c8b7",
  type: "page-type/song",
  slug: "paul-cardall-the-christmas-box",
  title: "The Christmas Box",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
