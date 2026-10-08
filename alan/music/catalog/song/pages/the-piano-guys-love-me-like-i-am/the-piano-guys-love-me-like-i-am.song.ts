import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysLoveMeLikeIAm = {
  id: "01a0b780-61f9-770f-b7a5-4347b0461eaf",
  type: "page-type/song",
  slug: "the-piano-guys-love-me-like-i-am",
  title: "Love Me Like I Am",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:30:39.353Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
