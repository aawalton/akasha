import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysEyesClosed = {
  id: "01a0b780-3a91-7f61-acf8-61b19f837cc6",
  type: "page-type/song",
  slug: "the-piano-guys-eyes-closed",
  title: "Eyes Closed",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
