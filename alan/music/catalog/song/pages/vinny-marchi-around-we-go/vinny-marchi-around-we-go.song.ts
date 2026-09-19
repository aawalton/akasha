import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiAroundWeGo = {
  id: "01a0b783-8b2c-79e7-aabf-4d986631f24d",
  type: "page-type/song",
  slug: "vinny-marchi-around-we-go",
  title: "Around We Go",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
