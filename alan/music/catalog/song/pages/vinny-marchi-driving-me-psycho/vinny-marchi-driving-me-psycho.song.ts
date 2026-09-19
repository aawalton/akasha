import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiDrivingMePsycho = {
  id: "01a0b783-a094-7178-94ea-31124ec20247",
  type: "page-type/song",
  slug: "vinny-marchi-driving-me-psycho",
  title: "DRIVING ME PSYCHO",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
