import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallAveVerumCorpus = {
  id: "01a0b779-d41f-7f3f-bfa1-faa7fa2e39b7",
  type: "page-type/song",
  slug: "paul-cardall-ave-verum-corpus",
  title: "Ave Verum Corpus",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
