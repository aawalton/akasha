import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeSomewhereOverTheRainbow = {
  id: "01a0b76f-f8ef-7c5f-bc1a-247c73cffacc",
  type: "page-type/song",
  slug: "ariana-grande-somewhere-over-the-rainbow",
  title: "Somewhere Over The Rainbow",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
