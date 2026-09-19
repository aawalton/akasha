import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallQuayesTheme = {
  id: "01a0b77e-d690-70f2-8b08-489c905ae5db",
  type: "page-type/song",
  slug: "paul-cardall-quayes-theme",
  title: "Quaye's Theme",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
