import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaLoveAndTheLights = {
  id: "01a0d52b-52d9-7030-9fc3-4cfcce9ca552",
  type: "page-type/song",
  slug: "rockapella-love-and-the-lights",
  title: "Love and the Lights",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
