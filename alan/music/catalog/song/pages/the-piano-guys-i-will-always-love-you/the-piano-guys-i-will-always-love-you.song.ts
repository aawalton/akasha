import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysIWillAlwaysLoveYou = {
  id: "01a0b780-1792-700c-b8f8-27166ed5f1e2",
  type: "page-type/song",
  slug: "the-piano-guys-i-will-always-love-you",
  title: "I Will Always Love You",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
