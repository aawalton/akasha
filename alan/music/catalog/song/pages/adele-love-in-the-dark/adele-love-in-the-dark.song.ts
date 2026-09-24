import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleLoveInTheDark = {
  id: "01a0d52b-c259-708d-b409-e118fa72db0f",
  type: "page-type/song",
  slug: "adele-love-in-the-dark",
  title: "Love In The Dark",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
