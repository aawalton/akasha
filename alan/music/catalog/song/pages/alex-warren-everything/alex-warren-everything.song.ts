import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const alexWarrenEverything = {
  id: "01a144f7-55fb-7be2-a6a1-e074c1813061",
  type: "page-type/song",
  slug: "alex-warren-everything",
  title: "Everything",
  artist: "artist/alex-warren",
  performed: true,
  createdAt: "2026-10-16T13:47:02.519Z",
  updatedAt: "2026-10-16T13:47:02.519Z",
} as const satisfies Song
