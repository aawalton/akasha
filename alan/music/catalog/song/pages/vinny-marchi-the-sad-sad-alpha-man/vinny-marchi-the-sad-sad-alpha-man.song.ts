import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiTheSadSadAlphaMan = {
  id: "01a0b783-d9a2-7193-8f4c-d6499d433532",
  type: "page-type/song",
  slug: "vinny-marchi-the-sad-sad-alpha-man",
  title: "The Sad Sad Alpha Man",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
