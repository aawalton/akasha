import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSweetHourOfPrayer = {
  id: "01a0b779-c2ba-7942-a6c8-7941fbcf9273",
  type: "page-type/song",
  slug: "paul-cardall-sweet-hour-of-prayer",
  title: "Sweet Hour of Prayer",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
