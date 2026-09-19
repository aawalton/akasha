import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallMarysLament = {
  id: "01a0b77d-8039-76c2-a1d1-31940bbcbcde",
  type: "page-type/song",
  slug: "paul-cardall-marys-lament",
  title: "Mary's Lament",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
