import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaHereComesTheSun = {
  id: "01a0d52b-52d8-7b80-9880-92544d31b034",
  type: "page-type/song",
  slug: "rockapella-here-comes-the-sun",
  title: "Here Comes the Sun",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
