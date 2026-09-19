import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallAmazingGrace = {
  id: "01a0b779-d1a6-75a1-b257-866a54568382",
  type: "page-type/song",
  slug: "paul-cardall-amazing-grace",
  title: "Amazing Grace",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
