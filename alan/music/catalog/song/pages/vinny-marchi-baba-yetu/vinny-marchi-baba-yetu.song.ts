import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiBabaYetu = {
  id: "01a0b783-85d4-7e1c-a42b-2d9ce54ed400",
  type: "page-type/song",
  slug: "vinny-marchi-baba-yetu",
  title: "Baba Yetu",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
