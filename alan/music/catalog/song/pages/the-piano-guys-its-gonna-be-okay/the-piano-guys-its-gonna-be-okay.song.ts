import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysItsGonnaBeOkay = {
  id: "01a0b780-4971-70f5-b7ca-f679ad012be3",
  type: "page-type/song",
  slug: "the-piano-guys-its-gonna-be-okay",
  title: "(It's Gonna Be) Okay",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:30:33.073Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
