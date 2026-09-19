import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSweetIsTheWork = {
  id: "01a0b77d-e4f2-737a-b113-a8c07efd92e0",
  type: "page-type/song",
  slug: "paul-cardall-sweet-is-the-work",
  title: "Sweet Is the Work",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
