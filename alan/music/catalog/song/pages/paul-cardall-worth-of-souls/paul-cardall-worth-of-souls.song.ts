import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallWorthOfSouls = {
  id: "01a0b77e-a439-773d-9d51-5cb0a89b7574",
  type: "page-type/song",
  slug: "paul-cardall-worth-of-souls",
  title: "Worth of Souls",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
