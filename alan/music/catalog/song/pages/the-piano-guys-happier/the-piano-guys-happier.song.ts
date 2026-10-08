import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysHappier = {
  id: "01a0b780-011f-732d-8744-019e6f921efc",
  type: "page-type/song",
  slug: "the-piano-guys-happier",
  title: "Happier",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:30:14.559Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
