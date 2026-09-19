import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSomethingBad = {
  id: "01a0b770-2be3-7a9e-a28d-e04264621492",
  type: "page-type/song",
  slug: "ariana-grande-something-bad",
  title: "Something Bad",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
