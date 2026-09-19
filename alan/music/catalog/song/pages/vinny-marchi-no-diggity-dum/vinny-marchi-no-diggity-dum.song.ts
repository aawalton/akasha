import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiNoDiggityDum = {
  id: "01a0b783-94b7-7e7e-b9d4-d0a89c5afd22",
  type: "page-type/song",
  slug: "vinny-marchi-no-diggity-dum",
  title: "No Diggity Dum",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
