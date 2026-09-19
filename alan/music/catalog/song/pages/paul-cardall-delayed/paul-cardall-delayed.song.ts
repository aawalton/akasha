import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallDelayed = {
  id: "01a0b77d-db35-7a61-b5dd-0ceca3afee60",
  type: "page-type/song",
  slug: "paul-cardall-delayed",
  title: "Delayed",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
