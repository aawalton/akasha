import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const lynLapidItsyBitsy = {
  id: "01a0c95e-c45f-77c2-bdff-1f9bed7ee132",
  type: "page-type/song",
  slug: "lyn-lapid-itsy-bitsy",
  title: "Itsy Bitsy",
  artist: "artist/lyn-lapid",
  performed: true,
} as const satisfies Song
