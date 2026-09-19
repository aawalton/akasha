import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheNoise = {
  id: "01a0b77d-38ec-7289-a872-e7653d1a319f",
  type: "page-type/song",
  slug: "paul-cardall-the-noise",
  title: "The Noise",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
