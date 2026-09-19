import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallFindingMyWay = {
  id: "01a0b77e-ad1c-79b1-ae80-1402142d979a",
  type: "page-type/song",
  slug: "paul-cardall-finding-my-way",
  title: "Finding My Way",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
