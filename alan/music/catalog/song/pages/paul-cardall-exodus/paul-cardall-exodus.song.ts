import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallExodus = {
  id: "01a0b77c-eead-7646-ad70-d14309af284d",
  type: "page-type/song",
  slug: "paul-cardall-exodus",
  title: "Exodus",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
