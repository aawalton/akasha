import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallDanceOfTheForgotten = {
  id: "01a0b77e-549b-73ab-b2de-1e3275dbacf8",
  type: "page-type/song",
  slug: "paul-cardall-dance-of-the-forgotten",
  title: "Dance of the Forgotten",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
