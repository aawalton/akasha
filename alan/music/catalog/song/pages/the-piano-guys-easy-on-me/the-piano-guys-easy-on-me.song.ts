import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysEasyOnMe = {
  id: "01a0b780-37f7-7ce9-9ad9-8e7cdd39903f",
  type: "page-type/song",
  slug: "the-piano-guys-easy-on-me",
  title: "Easy On Me",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
