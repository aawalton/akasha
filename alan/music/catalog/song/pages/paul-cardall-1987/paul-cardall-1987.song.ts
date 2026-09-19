import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardall1987 = {
  id: "01a0b77d-b5b2-76d7-afbe-4a914491a7ee",
  type: "page-type/song",
  slug: "paul-cardall-1987",
  title: "1987",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
