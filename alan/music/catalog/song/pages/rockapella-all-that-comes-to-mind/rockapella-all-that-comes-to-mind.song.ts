import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaAllThatComesToMind = {
  id: "01a0d52b-52d7-7064-980d-e3306cfb9e50",
  type: "page-type/song",
  slug: "rockapella-all-that-comes-to-mind",
  title: "All That Comes to Mind",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
