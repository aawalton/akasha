import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysUnsungHero = {
  id: "01a0b783-711d-72b9-8538-4da77263ccc4",
  type: "page-type/song",
  slug: "the-piano-guys-unsung-hero",
  title: "Unsung Hero",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:33:59.837Z",
  updatedAt: "2026-09-19T02:34:49.000Z",
} as const satisfies Song
