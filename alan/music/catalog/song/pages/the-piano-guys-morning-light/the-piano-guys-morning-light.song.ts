import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysMorningLight = {
  id: "01a0b783-7759-794a-a586-3b1ff35cf042",
  type: "page-type/song",
  slug: "the-piano-guys-morning-light",
  title: "Morning Light",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
