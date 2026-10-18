import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonAlone = {
  id: "01a14f45-0226-7807-88b4-394dcad64e6e",
  type: "page-type/song",
  slug: "kelly-clarkson-alone",
  title: "Alone",
  artist: "artist/kelly-clarkson",
  performed: true,
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Song
