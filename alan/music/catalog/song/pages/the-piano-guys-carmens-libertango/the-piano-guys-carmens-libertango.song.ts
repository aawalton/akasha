import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysCarmensLibertango = {
  id: "01a0b780-4459-7978-b12a-4818dae6be89",
  type: "page-type/song",
  slug: "the-piano-guys-carmens-libertango",
  title: "Carmen's Libertango",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:30:31.769Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
