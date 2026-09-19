import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTirNaNog = {
  id: "01a0b771-9554-7fa8-9824-177c980e6f12",
  type: "page-type/song",
  slug: "celtic-woman-tir-na-nog",
  title: "Tír na nÓg",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
