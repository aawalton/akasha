import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysRockMeetsRachmaninoff = {
  id: "01a0b780-7c7f-74cf-8d57-82b6cb57f5a3",
  type: "page-type/song",
  slug: "the-piano-guys-rock-meets-rachmaninoff",
  title: "Rock Meets Rachmaninoff",
  artist: "artist/the-piano-guys",
  performed: true,
  createdAt: "2026-09-19T02:30:46.143Z",
  updatedAt: "2026-09-19T02:33:47.000Z",
} as const satisfies Song
