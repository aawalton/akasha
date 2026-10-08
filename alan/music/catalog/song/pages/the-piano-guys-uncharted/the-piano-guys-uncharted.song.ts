import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysUncharted = {
  id: "01a0b780-d3d8-7b50-b1ce-d341ecfa4615",
  type: "page-type/song",
  slug: "the-piano-guys-uncharted",
  title: "Uncharted",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:31:08.504Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
