import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeASentimentalMan = {
  id: "01a0b770-1f30-71a9-a4c9-10ff2463af26",
  type: "page-type/song",
  slug: "ariana-grande-a-sentimental-man",
  title: "A Sentimental Man",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
