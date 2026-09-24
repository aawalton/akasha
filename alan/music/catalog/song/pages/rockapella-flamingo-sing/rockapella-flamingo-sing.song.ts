import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaFlamingoSing = {
  id: "01a0d52b-52d8-7c42-be44-2cc8f205e543",
  type: "page-type/song",
  slug: "rockapella-flamingo-sing",
  title: "Flamingo Sing",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
