import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallWhenMorningComes = {
  id: "01a0b77e-620a-76e8-8f79-5dc1ba03002a",
  type: "page-type/song",
  slug: "paul-cardall-when-morning-comes",
  title: "When Morning Comes",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
