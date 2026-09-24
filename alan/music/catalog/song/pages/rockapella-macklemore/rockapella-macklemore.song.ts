import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaMacklemore = {
  id: "01a0d52b-52d9-7700-811d-3c304d1dd62c",
  type: "page-type/song",
  slug: "rockapella-macklemore",
  title: "Macklemore",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
