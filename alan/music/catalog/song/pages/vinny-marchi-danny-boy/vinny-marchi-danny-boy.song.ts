import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiDannyBoy = {
  id: "01a0b783-9e06-77f1-925f-cf943dd67891",
  type: "page-type/song",
  slug: "vinny-marchi-danny-boy",
  title: "Danny Boy",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
