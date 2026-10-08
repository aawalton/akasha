import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysClairDeLune = {
  id: "01a0b780-6623-70bc-bff4-2aa90f039401",
  type: "page-type/song",
  slug: "the-piano-guys-clair-de-lune",
  title: "Clair de Lune",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:30:40.419Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
