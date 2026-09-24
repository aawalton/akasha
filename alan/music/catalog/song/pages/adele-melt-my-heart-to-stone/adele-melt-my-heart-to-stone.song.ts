import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleMeltMyHeartToStone = {
  id: "01a0d52b-c259-7dfd-bf14-1ee6d37466e5",
  type: "page-type/song",
  slug: "adele-melt-my-heart-to-stone",
  title: "Melt My Heart to Stone",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
