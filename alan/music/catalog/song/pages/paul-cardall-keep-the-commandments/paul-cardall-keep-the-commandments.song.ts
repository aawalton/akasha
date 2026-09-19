import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallKeepTheCommandments = {
  id: "01a0b77e-6ab0-7001-8a64-624e0d7fcfbd",
  type: "page-type/song",
  slug: "paul-cardall-keep-the-commandments",
  title: "Keep the Commandments",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
