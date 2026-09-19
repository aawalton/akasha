import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysChopsticksLullaby = {
  id: "01a0b780-6491-7337-b2d3-298d44432a45",
  type: "page-type/song",
  slug: "the-piano-guys-chopsticks-lullaby",
  title: "Chopsticks Lullaby",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
