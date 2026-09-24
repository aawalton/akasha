import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleHoldOn = {
  id: "01a0d52b-c259-7471-8eb7-3d54958febc4",
  type: "page-type/song",
  slug: "adele-hold-on",
  title: "Hold On",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
