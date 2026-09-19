import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiWingsOfWax = {
  id: "01a0b783-e17f-7ee9-a674-d3cd77512aa7",
  type: "page-type/song",
  slug: "vinny-marchi-wings-of-wax",
  title: "Wings of Wax",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
