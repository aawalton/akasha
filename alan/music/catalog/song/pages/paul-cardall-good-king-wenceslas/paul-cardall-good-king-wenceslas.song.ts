import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallGoodKingWenceslas = {
  id: "01a0b77a-09f7-7d32-9d88-41e23918f47c",
  type: "page-type/song",
  slug: "paul-cardall-good-king-wenceslas",
  title: "Good King Wenceslas",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
