import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallHappierTimes = {
  id: "01a0b77d-e8e0-7681-9825-8f22e8fdf9e6",
  type: "page-type/song",
  slug: "paul-cardall-happier-times",
  title: "Happier Times",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
