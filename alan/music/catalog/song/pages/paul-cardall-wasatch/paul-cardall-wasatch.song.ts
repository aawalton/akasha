import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallWasatch = {
  id: "01a0b77d-3a1a-7718-bf19-67f972898f21",
  type: "page-type/song",
  slug: "paul-cardall-wasatch",
  title: "Wasatch",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
