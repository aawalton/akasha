import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallWindsOfChange = {
  id: "01a0b77d-27e2-706d-afdc-1d416c35c4ff",
  type: "page-type/song",
  slug: "paul-cardall-winds-of-change",
  title: "Winds of Change",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
