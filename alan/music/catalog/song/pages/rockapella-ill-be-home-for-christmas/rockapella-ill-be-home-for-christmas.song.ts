import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const rockapellaIllBeHomeForChristmas = {
  id: "01a0d52b-52d8-7f5a-9b5c-f76e89d76d82",
  type: "page-type/song",
  slug: "rockapella-ill-be-home-for-christmas",
  title: "I'll Be Home for Christmas",
  artist: "artist/rockapella",
  performed: true,
} as const satisfies Song
