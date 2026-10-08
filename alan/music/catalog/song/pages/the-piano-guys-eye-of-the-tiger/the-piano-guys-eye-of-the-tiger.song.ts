import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysEyeOfTheTiger = {
  id: "01a0b780-393f-73de-95d3-bdbf13e99433",
  type: "page-type/song",
  slug: "the-piano-guys-eye-of-the-tiger",
  title: "Eye of the Tiger",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:30:28.927Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
