import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const enyaOnlyTime = {
  id: "01a14a1d-db43-7dda-9ee2-aeeb3f0cecca",
  type: "page-type/song",
  slug: "enya-only-time",
  title: "Only Time",
  artist: "artist/enya",
  performed: true,
  createdAt: "2026-10-17T13:47:13.085Z",
  updatedAt: "2026-10-17T13:47:13.085Z",
} as const satisfies Song
