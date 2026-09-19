import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeLikeIDo = {
  id: "01a0b76f-ecc0-7def-9e41-b1e70d4c5ae5",
  type: "page-type/song",
  slug: "ariana-grande-like-i-do",
  title: "like i do",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
