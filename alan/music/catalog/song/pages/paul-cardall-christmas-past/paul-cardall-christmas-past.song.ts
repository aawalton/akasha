import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallChristmasPast = {
  id: "01a0b77d-3c84-7cac-84cb-7385b660e6b6",
  type: "page-type/song",
  slug: "paul-cardall-christmas-past",
  title: "Christmas Past",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
