import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandePetal = {
  id: "01a0b76f-f213-7335-97bf-27c96941a1d6",
  type: "page-type/song",
  slug: "ariana-grande-petal",
  title: "petal",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
