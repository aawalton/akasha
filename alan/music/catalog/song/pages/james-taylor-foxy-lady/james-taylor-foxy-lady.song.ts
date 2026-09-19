import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorFoxyLady = {
  id: "01a0b779-63e9-7128-aacd-39a51dd45e36",
  type: "page-type/song",
  slug: "james-taylor-foxy-lady",
  title: "Foxy Lady",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
