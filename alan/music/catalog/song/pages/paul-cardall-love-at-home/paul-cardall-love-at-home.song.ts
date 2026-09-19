import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallLoveAtHome = {
  id: "01a0b77d-a398-7cc0-9395-023d6d42067c",
  type: "page-type/song",
  slug: "paul-cardall-love-at-home",
  title: "Love at Home",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
