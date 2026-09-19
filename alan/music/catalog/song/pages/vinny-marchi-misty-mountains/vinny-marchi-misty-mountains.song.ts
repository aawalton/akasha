import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiMistyMountains = {
  id: "01a0b783-baa9-7366-8de9-3a0622598234",
  type: "page-type/song",
  slug: "vinny-marchi-misty-mountains",
  title: "Misty Mountains",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
