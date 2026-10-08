import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysMyGirl = {
  id: "01a0b780-19e9-7b75-924d-ff4dc09b234d",
  type: "page-type/song",
  slug: "the-piano-guys-my-girl",
  title: "My Girl",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:30:20.905Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
