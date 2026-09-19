import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiRidingWaves = {
  id: "01a0b783-c24b-740d-a2b8-04999b1cfe07",
  type: "page-type/song",
  slug: "vinny-marchi-riding-waves",
  title: "Riding Waves",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
