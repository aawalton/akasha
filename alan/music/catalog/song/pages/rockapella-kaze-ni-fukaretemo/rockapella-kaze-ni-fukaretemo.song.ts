import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaKazeNiFukaretemo = {
  id: "01a0d52b-52d9-7a1f-919a-1e4360a32564",
  type: "page-type/song",
  slug: "rockapella-kaze-ni-fukaretemo",
  title: "Kaze Ni Fukaretemo",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
