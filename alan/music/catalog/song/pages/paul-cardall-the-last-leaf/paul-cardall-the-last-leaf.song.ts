import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheLastLeaf = {
  id: "01a0b77c-fcae-780f-9773-bd70c8725004",
  type: "page-type/song",
  slug: "paul-cardall-the-last-leaf",
  title: "The Last Leaf",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
