import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallOutOfTheAshes = {
  id: "01a0b77e-5b2b-7056-a64e-2ee82b67144f",
  type: "page-type/song",
  slug: "paul-cardall-out-of-the-ashes",
  title: "Out of the Ashes",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
