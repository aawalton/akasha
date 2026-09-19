import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallSeparatePeace = {
  id: "01a0b77e-93db-7e8c-9424-29ea75dc0562",
  type: "page-type/song",
  slug: "paul-cardall-separate-peace",
  title: "Separate Peace",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
