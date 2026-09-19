import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallGrateful = {
  id: "01a0b77e-a037-78e4-bb2b-a995f820bbc1",
  type: "page-type/song",
  slug: "paul-cardall-grateful",
  title: "Grateful",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
