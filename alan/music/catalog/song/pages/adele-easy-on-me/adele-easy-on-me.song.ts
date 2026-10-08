import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleEasyOnMe = {
  id: "01a0d52b-c259-786d-a9f8-7ef082847e23",
  type: "page-type/song",
  slug: "adele-easy-on-me",
  title: "Easy On Me",
  artist: "artist/adele",
  performed: true,
  createdAt: "2026-09-24T20:46:49.945Z",
  updatedAt: "2026-09-24T20:46:51.000Z",
} as const satisfies Song
