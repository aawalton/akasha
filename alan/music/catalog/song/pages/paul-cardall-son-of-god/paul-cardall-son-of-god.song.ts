import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSonOfGod = {
  id: "01a0b77a-0187-766d-b184-d345cbbda1b7",
  type: "page-type/song",
  slug: "paul-cardall-son-of-god",
  title: "Son of God",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
