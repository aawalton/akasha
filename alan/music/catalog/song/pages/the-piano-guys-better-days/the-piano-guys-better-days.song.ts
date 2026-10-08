import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysBetterDays = {
  id: "01a0b77f-fc34-7614-ba02-7308f0efddca",
  type: "page-type/song",
  slug: "the-piano-guys-better-days",
  title: "Better Days",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:30:13.300Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
