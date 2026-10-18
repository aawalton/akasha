import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonMe = {
  id: "01a14f45-0229-7b65-8b3a-068b4e34964a",
  type: "page-type/song",
  slug: "kelly-clarkson-me",
  title: "me",
  artist: "artist/kelly-clarkson",
  performed: true,
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Song
