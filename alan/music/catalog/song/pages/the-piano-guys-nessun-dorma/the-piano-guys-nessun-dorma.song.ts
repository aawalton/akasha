import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysNessunDorma = {
  id: "01a0b780-6c4c-762a-864d-dae038340981",
  type: "page-type/song",
  slug: "the-piano-guys-nessun-dorma",
  title: "Nessun Dorma",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:30:41.996Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
