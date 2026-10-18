import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const kellyClarksonHello = {
  id: "01a14f45-0228-70a2-8ea6-64ede3b711e4",
  type: "page-type/song",
  slug: "kelly-clarkson-hello",
  title: "Hello",
  artist: "artist/kelly-clarkson",
  performed: true,
  createdAt: "2026-10-18T13:48:05.026Z",
  updatedAt: "2026-10-18T13:48:05.026Z",
} as const satisfies Song
