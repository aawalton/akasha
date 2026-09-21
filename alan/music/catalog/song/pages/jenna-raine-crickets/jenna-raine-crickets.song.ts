import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineCrickets = {
  id: "01a0c621-203e-7ceb-8f3e-bfcb5df5eec5",
  type: "page-type/song",
  slug: "jenna-raine-crickets",
  title: "Crickets",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
