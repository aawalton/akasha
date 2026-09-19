import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallFragile = {
  id: "01a0b77d-a9bf-774e-a70e-ff93d2b6e13e",
  type: "page-type/song",
  slug: "paul-cardall-fragile",
  title: "Fragile",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
