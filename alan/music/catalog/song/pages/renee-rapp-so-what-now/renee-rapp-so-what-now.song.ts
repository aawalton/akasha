import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const reneeRappSoWhatNow = {
  id: "01a0caa9-08a1-78e9-8f60-01d65af8522a",
  type: "page-type/song",
  slug: "renee-rapp-so-what-now",
  title: "So What Now",
  artist: "artist/renee-rapp",
  performed: true,
} as const satisfies Song
