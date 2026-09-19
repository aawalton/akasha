import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeBigFeelings = {
  id: "01a0b76f-e8ec-73b3-94c6-4bd66819212f",
  type: "page-type/song",
  slug: "ariana-grande-big-feelings",
  title: "big feelings",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
