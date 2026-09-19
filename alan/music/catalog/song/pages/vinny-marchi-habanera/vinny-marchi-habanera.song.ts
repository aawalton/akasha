import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiHabanera = {
  id: "01a0b783-a467-7b98-94da-edff8a22bf91",
  type: "page-type/song",
  slug: "vinny-marchi-habanera",
  title: "Habanera",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
