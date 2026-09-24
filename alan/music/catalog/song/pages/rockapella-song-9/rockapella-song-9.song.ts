import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaSong9 = {
  id: "01a0d52b-52d9-7f5a-85d0-4f57eeb0ce6b",
  type: "page-type/song",
  slug: "rockapella-song-9",
  title: "Song 9",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
