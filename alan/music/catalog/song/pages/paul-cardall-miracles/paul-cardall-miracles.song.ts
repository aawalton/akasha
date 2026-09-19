import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallMiracles = {
  id: "01a0b77d-d324-7dac-92c5-57a6b8b35e97",
  type: "page-type/song",
  slug: "paul-cardall-miracles",
  title: "Miracles",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
