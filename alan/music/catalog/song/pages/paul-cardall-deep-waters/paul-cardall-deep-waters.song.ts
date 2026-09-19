import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallDeepWaters = {
  id: "01a0b77e-5720-7cb9-b733-9eb7b22b3598",
  type: "page-type/song",
  slug: "paul-cardall-deep-waters",
  title: "Deep Waters",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
