import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaMyGirl = {
  id: "01a0d52b-52d9-72d2-8d39-725623f680ef",
  type: "page-type/song",
  slug: "rockapella-my-girl",
  title: "My Girl",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
