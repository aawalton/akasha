import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysUnstoppable = {
  id: "01a0b780-dd47-749d-a473-53b11d278506",
  type: "page-type/song",
  slug: "the-piano-guys-unstoppable",
  title: "Unstoppable",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:31:10.919Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
