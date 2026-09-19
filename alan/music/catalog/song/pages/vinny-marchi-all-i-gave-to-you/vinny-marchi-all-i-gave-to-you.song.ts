import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiAllIGaveToYou = {
  id: "01a0b783-8221-74b6-af67-62faf3ca8344",
  type: "page-type/song",
  slug: "vinny-marchi-all-i-gave-to-you",
  title: "all i gave to you",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
