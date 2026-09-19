import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallHallelujah = {
  id: "01a0b779-de53-777c-9d54-8a935519fd0c",
  type: "page-type/song",
  slug: "paul-cardall-hallelujah",
  title: "Hallelujah",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
