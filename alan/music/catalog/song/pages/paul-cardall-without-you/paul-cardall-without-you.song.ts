import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallWithoutYou = {
  id: "01a0b77e-97a0-7e78-b06a-bd1d1404d5e1",
  type: "page-type/song",
  slug: "paul-cardall-without-you",
  title: "Without You",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
