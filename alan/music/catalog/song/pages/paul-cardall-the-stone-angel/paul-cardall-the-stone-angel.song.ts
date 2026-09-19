import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTheStoneAngel = {
  id: "01a0b77e-c97a-7e3b-b029-8d9da30c45f9",
  type: "page-type/song",
  slug: "paul-cardall-the-stone-angel",
  title: "The Stone Angel",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
