import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallHymnMedley = {
  id: "01a0b77d-ae7f-745d-8293-a6338c067b08",
  type: "page-type/song",
  slug: "paul-cardall-hymn-medley",
  title: "Hymn Medley",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
