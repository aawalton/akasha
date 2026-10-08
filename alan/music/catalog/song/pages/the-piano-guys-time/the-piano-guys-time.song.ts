import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysTime = {
  id: "01a0b780-3519-7389-9043-edb205fb4e9f",
  type: "page-type/song",
  slug: "the-piano-guys-time",
  title: "Time",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:30:27.865Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
