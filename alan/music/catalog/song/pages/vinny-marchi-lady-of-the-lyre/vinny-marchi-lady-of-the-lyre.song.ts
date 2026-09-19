import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiLadyOfTheLyre = {
  id: "01a0b783-b0d5-7d39-a916-05b77f02596a",
  type: "page-type/song",
  slug: "vinny-marchi-lady-of-the-lyre",
  title: "Lady of the Lyre",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
