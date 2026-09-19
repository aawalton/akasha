import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallFallingSlowly = {
  id: "01a0b77e-8d16-7956-913e-656719fd165b",
  type: "page-type/song",
  slug: "paul-cardall-falling-slowly",
  title: "Falling Slowly",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
