import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaIHaveALittleDreidel = {
  id: "01a0d52b-52d8-76f1-b999-2eb8a0a3aca5",
  type: "page-type/song",
  slug: "rockapella-i-have-a-little-dreidel",
  title: "I Have a Little Dreidel",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
