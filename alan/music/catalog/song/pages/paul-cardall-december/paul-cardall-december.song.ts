import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallDecember = {
  id: "01a0b77d-591e-78d1-83df-2b7fbd9cc1c3",
  type: "page-type/song",
  slug: "paul-cardall-december",
  title: "December",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
