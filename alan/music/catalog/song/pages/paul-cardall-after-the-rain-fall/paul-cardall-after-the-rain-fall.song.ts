import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallAfterTheRainFall = {
  id: "01a0b77e-4f9c-7ca5-b7d4-224ab3eba63d",
  type: "page-type/song",
  slug: "paul-cardall-after-the-rain-fall",
  title: "After the Rain Fall",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
