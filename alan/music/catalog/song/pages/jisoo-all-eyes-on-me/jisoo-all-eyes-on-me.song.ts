import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jisooAllEyesOnMe = {
  id: "01a0b779-97d8-76ea-9195-cbc7ffdba84f",
  type: "page-type/song",
  slug: "jisoo-all-eyes-on-me",
  title: "All Eyes On Me",
  artist: "artist/jisoo",
  performed: true,
} as const satisfies Song
