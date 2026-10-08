import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysFirstDance = {
  id: "01a0b780-4d3e-71e6-9013-82ebec36a489",
  type: "page-type/song",
  slug: "the-piano-guys-first-dance",
  title: "First Dance",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:30:34.046Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
