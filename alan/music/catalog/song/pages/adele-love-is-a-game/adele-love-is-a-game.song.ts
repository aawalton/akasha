import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleLoveIsAGame = {
  id: "01a0d52b-c259-7985-8eb7-947b2de33090",
  type: "page-type/song",
  slug: "adele-love-is-a-game",
  title: "Love Is A Game",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
