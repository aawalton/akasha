import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallFaithful = {
  id: "01a0b77d-314e-7c43-8926-2f41e1b1fae9",
  type: "page-type/song",
  slug: "paul-cardall-faithful",
  title: "Faithful",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
