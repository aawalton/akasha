import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysIAintWorried = {
  id: "01a0b780-4597-7c9a-9c5d-b634b8ed7e9d",
  type: "page-type/song",
  slug: "the-piano-guys-i-aint-worried",
  title: "I Ain't Worried",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
