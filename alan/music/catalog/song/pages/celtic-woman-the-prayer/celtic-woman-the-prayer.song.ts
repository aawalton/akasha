import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanThePrayer = {
  id: "01a0b771-4534-771f-9e25-8ce5809eae26",
  type: "page-type/song",
  slug: "celtic-woman-the-prayer",
  title: "The Prayer",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
