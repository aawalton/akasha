import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeKnewBetterPartTwo = {
  id: "01a0b76f-de99-7e91-bf50-ea1b7d6a1d8e",
  type: "page-type/song",
  slug: "ariana-grande-knew-better-part-two",
  title: "Knew Better Part Two",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
