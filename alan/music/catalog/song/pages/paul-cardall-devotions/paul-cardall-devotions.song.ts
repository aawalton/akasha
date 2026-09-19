import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallDevotions = {
  id: "01a0b77d-486a-721e-89ff-dca0726f9e4d",
  type: "page-type/song",
  slug: "paul-cardall-devotions",
  title: "Devotions",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
