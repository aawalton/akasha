import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSomewhereOverTheRainbow = {
  id: "01a0b76f-f8ef-7c5f-bc1a-247c73cffacc",
  type: "page-type/song",
  slug: "ariana-grande-somewhere-over-the-rainbow",
  title: "Somewhere Over The Rainbow",
  artist: "artist/ariana-grande",
  performed: true,
  createdAt: "2026-09-19T02:12:43.887Z",
  updatedAt: "2026-09-19T02:13:10.000Z",
} as const satisfies Song
