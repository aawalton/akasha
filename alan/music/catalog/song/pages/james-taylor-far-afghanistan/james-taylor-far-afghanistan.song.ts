import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorFarAfghanistan = {
  id: "01a0b779-5896-76f7-a514-1b8d036cf6d5",
  type: "page-type/song",
  slug: "james-taylor-far-afghanistan",
  title: "Far Afghanistan",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
