import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorWatchinOverMe = {
  id: "01a0b779-5ec1-723c-9bca-5db82284b69e",
  type: "page-type/song",
  slug: "james-taylor-watchin-over-me",
  title: "Watchin’ Over Me",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
