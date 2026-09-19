import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallHowGreatThouArt = {
  id: "01a0b779-e2a2-7412-9f7c-ce0ae040d60f",
  type: "page-type/song",
  slug: "paul-cardall-how-great-thou-art",
  title: "How Great Thou Art",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
