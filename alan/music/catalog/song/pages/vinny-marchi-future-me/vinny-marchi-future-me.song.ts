import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiFutureMe = {
  id: "01a0b783-c707-7552-adcf-b6b0cfec210f",
  type: "page-type/song",
  slug: "vinny-marchi-future-me",
  title: "future me",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
