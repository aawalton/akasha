import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiYouDontKnowMe = {
  id: "01a0b783-d117-7d19-8726-1586e9cf396c",
  type: "page-type/song",
  slug: "vinny-marchi-you-dont-know-me",
  title: "you don't know me!!",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
