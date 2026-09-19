import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiAveMaria = {
  id: "01a0b783-848b-75ac-930f-c66f821b3538",
  type: "page-type/song",
  slug: "vinny-marchi-ave-maria",
  title: "Ave Maria",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
