import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiGood = {
  id: "01a0b783-c83e-7e25-bd6b-c686e2a9d51a",
  type: "page-type/song",
  slug: "vinny-marchi-good",
  title: "good",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
