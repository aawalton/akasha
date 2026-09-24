import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleOneAndOnly = {
  id: "01a0d52b-c259-7852-831b-c160af9e729b",
  type: "page-type/song",
  slug: "adele-one-and-only",
  title: "One And Only",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
