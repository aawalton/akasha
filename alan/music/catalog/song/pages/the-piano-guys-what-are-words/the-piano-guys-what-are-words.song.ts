import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysWhatAreWords = {
  id: "01a0b783-649a-7c1d-9670-e6c285d4d083",
  type: "page-type/song",
  slug: "the-piano-guys-what-are-words",
  title: "What Are Words",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
