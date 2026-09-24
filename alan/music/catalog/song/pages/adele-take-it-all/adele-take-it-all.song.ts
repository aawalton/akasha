import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleTakeItAll = {
  id: "01a0d52b-c259-74b4-85b2-416daefda27f",
  type: "page-type/song",
  slug: "adele-take-it-all",
  title: "Take It All",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
