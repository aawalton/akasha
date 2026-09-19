import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallLessComplicated = {
  id: "01a0b77d-33dc-7b28-860d-bc40d073c7ed",
  type: "page-type/song",
  slug: "paul-cardall-less-complicated",
  title: "Less Complicated",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
