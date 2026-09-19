import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheRiver = {
  id: "01a0b77e-9533-7923-87e3-a1e4f4496f3a",
  type: "page-type/song",
  slug: "paul-cardall-the-river",
  title: "The River",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
