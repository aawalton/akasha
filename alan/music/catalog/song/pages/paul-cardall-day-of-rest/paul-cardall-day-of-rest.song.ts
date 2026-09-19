import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallDayOfRest = {
  id: "01a0b77d-8ea1-7d56-93f0-657eff886417",
  type: "page-type/song",
  slug: "paul-cardall-day-of-rest",
  title: "Day Of Rest",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
