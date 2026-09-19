import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysThePianoGuysIntroduction = {
  id: "01a0b780-5c19-716b-a1e6-a0ad8f26c757",
  type: "page-type/song",
  slug: "the-piano-guys-the-piano-guys-introduction",
  title: "The Piano Guys (Introduction)",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
