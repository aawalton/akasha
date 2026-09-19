import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheDream = {
  id: "01a0b77e-d909-7271-b333-4aaafe3fa3fd",
  type: "page-type/song",
  slug: "paul-cardall-the-dream",
  title: "The Dream",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
