import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const billieEilishHappierThanEver = {
  id: "01a0b771-0fc1-74e7-87b3-11d1dba4e836",
  type: "page-type/song",
  slug: "billie-eilish-happier-than-ever",
  title: "Happier Than Ever",
  artist: "artist/billie-eilish",
  performed: true,
} as const satisfies Song
