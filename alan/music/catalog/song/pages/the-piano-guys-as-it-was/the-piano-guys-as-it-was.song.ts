import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysAsItWas = {
  id: "01a0b780-1089-7817-a371-d24b42a1a9e2",
  type: "page-type/song",
  slug: "the-piano-guys-as-it-was",
  title: "As It Was",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:30:18.505Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
