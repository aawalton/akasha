import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleSetFireToTheRain = {
  id: "01a0d52b-c259-7caf-b48b-a875ffd8deda",
  type: "page-type/song",
  slug: "adele-set-fire-to-the-rain",
  title: "Set Fire to the Rain",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
