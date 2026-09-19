import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallPassingTime = {
  id: "01a0b77d-c06e-77da-83bb-8fb410e448c6",
  type: "page-type/song",
  slug: "paul-cardall-passing-time",
  title: "Passing Time",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
