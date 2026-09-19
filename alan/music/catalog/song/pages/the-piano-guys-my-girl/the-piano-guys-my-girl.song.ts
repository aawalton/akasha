import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysMyGirl = {
  id: "01a0b780-19e9-7b75-924d-ff4dc09b234d",
  type: "page-type/song",
  slug: "the-piano-guys-my-girl",
  title: "My Girl",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
