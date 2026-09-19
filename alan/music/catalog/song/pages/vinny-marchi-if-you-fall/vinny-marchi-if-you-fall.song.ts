import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiIfYouFall = {
  id: "01a0b783-935e-7222-b6b7-bef7d969085d",
  type: "page-type/song",
  slug: "vinny-marchi-if-you-fall",
  title: "If You Fall",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
