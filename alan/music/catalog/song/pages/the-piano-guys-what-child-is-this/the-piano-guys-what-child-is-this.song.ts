import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysWhatChildIsThis = {
  id: "01a0b780-30da-7c86-befd-2a84131bbbf2",
  type: "page-type/song",
  slug: "the-piano-guys-what-child-is-this",
  title: "What Child is This",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
