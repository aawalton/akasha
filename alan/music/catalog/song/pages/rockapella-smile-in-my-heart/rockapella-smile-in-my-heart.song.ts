import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaSmileInMyHeart = {
  id: "01a0d52b-52d9-7da2-9ca3-60acd058d63f",
  type: "page-type/song",
  slug: "rockapella-smile-in-my-heart",
  title: "Smile in My Heart",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
