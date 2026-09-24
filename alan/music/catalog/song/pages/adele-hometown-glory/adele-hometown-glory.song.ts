import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleHometownGlory = {
  id: "01a0d52b-c259-7585-b2d0-303995fcea95",
  type: "page-type/song",
  slug: "adele-hometown-glory",
  title: "Hometown Glory",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
