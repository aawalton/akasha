import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallINeedTheeEveryHour = {
  id: "01a0b779-b2d9-7fbb-a946-3dfdb20d2417",
  type: "page-type/song",
  slug: "paul-cardall-i-need-thee-every-hour",
  title: "I Need Thee Every Hour",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
