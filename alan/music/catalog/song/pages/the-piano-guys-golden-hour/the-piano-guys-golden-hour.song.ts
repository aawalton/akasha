import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysGoldenHour = {
  id: "01a0b780-42f3-75f8-b365-e1931bbb9363",
  type: "page-type/song",
  slug: "the-piano-guys-golden-hour",
  title: "Golden Hour",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:30:31.411Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
