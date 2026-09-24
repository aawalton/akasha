import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaHaveALittleFaith = {
  id: "01a0d52b-52d8-7057-9943-dbfc6699f1b4",
  type: "page-type/song",
  slug: "rockapella-have-a-little-faith",
  title: "Have a Little Faith",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
