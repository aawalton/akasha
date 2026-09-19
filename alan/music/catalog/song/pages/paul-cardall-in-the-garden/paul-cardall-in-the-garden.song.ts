import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallInTheGarden = {
  id: "01a0b779-b5fc-7578-b434-30e3546e6700",
  type: "page-type/song",
  slug: "paul-cardall-in-the-garden",
  title: "In the Garden",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
