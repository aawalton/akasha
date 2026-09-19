import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeInMyHeadInterlude = {
  id: "01a0b76f-e677-7d1e-b12e-d9177be7f6bc",
  type: "page-type/song",
  slug: "ariana-grande-in-my-head-interlude",
  title: "in my head interlude",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
