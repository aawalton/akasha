import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysEasyOnMe = {
  id: "01a0b780-37f7-7ce9-9ad9-8e7cdd39903f",
  type: "page-type/song",
  slug: "the-piano-guys-easy-on-me",
  title: "Easy On Me",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:30:28.599Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
