import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const chaislynLittleDidIKnow = {
  id: "01a0ba64-aabd-73f2-aea7-c552ef261294",
  type: "page-type/song",
  slug: "chaislyn-little-did-i-know",
  title: "Little Did I Know",
  artist: "artist/chaislyn",
  performed: true,
} as const satisfies Song
