import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiMayItBe = {
  id: "01a0b783-cd17-7e6a-8453-51dced78680b",
  type: "page-type/song",
  slug: "vinny-marchi-may-it-be",
  title: "May It Be",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
