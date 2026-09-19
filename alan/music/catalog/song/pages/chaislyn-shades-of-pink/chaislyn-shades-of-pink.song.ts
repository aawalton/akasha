import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const chaislynShadesOfPink = {
  id: "01a0ba64-af6d-7f1c-b922-479d8a8b5c92",
  type: "page-type/song",
  slug: "chaislyn-shades-of-pink",
  title: "Shades of Pink",
  artist: "artist/chaislyn",
  performed: true,
} as const satisfies Song
