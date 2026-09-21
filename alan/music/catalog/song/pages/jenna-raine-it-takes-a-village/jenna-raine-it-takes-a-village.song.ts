import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineItTakesAVillage = {
  id: "01a0c621-14cf-7dc9-88cf-13dca5500dce",
  type: "page-type/song",
  slug: "jenna-raine-it-takes-a-village",
  title: "It Takes A Village",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
