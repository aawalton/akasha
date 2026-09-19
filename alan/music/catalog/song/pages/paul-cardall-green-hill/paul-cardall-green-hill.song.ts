import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallGreenHill = {
  id: "01a0b77e-a180-747c-8ad0-d25d0263fb5d",
  type: "page-type/song",
  slug: "paul-cardall-green-hill",
  title: "Green Hill",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
