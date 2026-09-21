import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineSoFarSoGood = {
  id: "01a0c621-176b-70a1-b7be-902e334e2920",
  type: "page-type/song",
  slug: "jenna-raine-so-far-so-good",
  title: "So Far, So Good",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
