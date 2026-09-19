import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallCastlesAndCathedrals = {
  id: "01a0b77e-7207-7905-9753-697b14991be7",
  type: "page-type/song",
  slug: "paul-cardall-castles-and-cathedrals",
  title: "Castles and Cathedrals",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
