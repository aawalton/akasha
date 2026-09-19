import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSacredNature = {
  id: "01a0b77d-7757-745d-90c6-3b8ce72298b4",
  type: "page-type/song",
  slug: "paul-cardall-sacred-nature",
  title: "Sacred Nature",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
