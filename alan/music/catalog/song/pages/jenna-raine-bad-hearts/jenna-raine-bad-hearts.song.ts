import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineBadHearts = {
  id: "01a0c621-2147-77eb-8b0c-2d7f55624f2b",
  type: "page-type/song",
  slug: "jenna-raine-bad-hearts",
  title: "Bad Hearts",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
