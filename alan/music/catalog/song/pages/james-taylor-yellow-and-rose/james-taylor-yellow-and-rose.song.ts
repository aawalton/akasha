import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorYellowAndRose = {
  id: "01a0b779-6fac-79f1-84f1-911d891c7691",
  type: "page-type/song",
  slug: "james-taylor-yellow-and-rose",
  title: "Yellow and Rose",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
