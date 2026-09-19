import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallStrangers = {
  id: "01a0b77d-5134-7471-b2a2-e922ead94486",
  type: "page-type/song",
  slug: "paul-cardall-strangers",
  title: "Strangers",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
