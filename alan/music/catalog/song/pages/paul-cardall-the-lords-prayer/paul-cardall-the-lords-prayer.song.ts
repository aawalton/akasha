import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheLordsPrayer = {
  id: "01a0b779-f101-767a-8d7b-78471dcb97b9",
  type: "page-type/song",
  slug: "paul-cardall-the-lords-prayer",
  title: "The Lord's Prayer",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
