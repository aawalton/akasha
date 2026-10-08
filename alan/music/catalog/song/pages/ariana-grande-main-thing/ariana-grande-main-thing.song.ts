import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeMainThing = {
  id: "01a0b76f-f5ac-7dfb-a8de-33a2abd297c0",
  type: "page-type/song",
  slug: "ariana-grande-main-thing",
  title: "main thing",
  artist: "artist/ariana-grande",
  performed: true,
  createdAt: "2026-09-19T02:12:43.052Z",
  updatedAt: "2026-09-19T02:13:10.000Z",
} as const satisfies Song
