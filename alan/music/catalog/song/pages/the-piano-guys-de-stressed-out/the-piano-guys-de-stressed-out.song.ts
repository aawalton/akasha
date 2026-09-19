import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysDeStressedOut = {
  id: "01a0b780-1666-7ca7-b2e7-3a757d77e5cd",
  type: "page-type/song",
  slug: "the-piano-guys-de-stressed-out",
  title: "(De)Stressed Out",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
