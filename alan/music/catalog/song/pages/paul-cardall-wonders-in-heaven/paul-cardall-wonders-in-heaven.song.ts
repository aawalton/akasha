import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallWondersInHeaven = {
  id: "01a0b77a-0521-7d87-8f90-8ce41d7afee5",
  type: "page-type/song",
  slug: "paul-cardall-wonders-in-heaven",
  title: "Wonders in Heaven",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
