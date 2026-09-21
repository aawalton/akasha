import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jennaRaineLostAtSea = {
  id: "01a0c621-2556-73e3-96df-af4277ecb3ef",
  type: "page-type/song",
  slug: "jenna-raine-lost-at-sea",
  title: "Lost at Sea",
  artist: "artist/jenna-raine",
  performed: true,
} as const satisfies Song
