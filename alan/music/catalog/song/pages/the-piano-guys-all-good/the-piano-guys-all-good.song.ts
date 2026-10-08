import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysAllGood = {
  id: "01a0b780-6352-7e98-8bda-937bb6182c10",
  type: "page-type/song",
  slug: "the-piano-guys-all-good",
  title: "All Good",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:30:39.698Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
