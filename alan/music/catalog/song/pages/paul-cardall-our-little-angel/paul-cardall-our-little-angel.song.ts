import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallOurLittleAngel = {
  id: "01a0b77a-0e17-700f-b8db-e182602376ce",
  type: "page-type/song",
  slug: "paul-cardall-our-little-angel",
  title: "Our Little Angel",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
