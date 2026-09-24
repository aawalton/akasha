import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaBabygirl = {
  id: "01a0d52b-52d7-70a9-a8e1-ee5cb6711756",
  type: "page-type/song",
  slug: "rockapella-babygirl",
  title: "Babygirl",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
