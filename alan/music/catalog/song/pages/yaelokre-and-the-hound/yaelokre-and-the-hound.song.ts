import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const yaelokreAndTheHound = {
  id: "01a0ce87-10d6-71f4-b86e-ef2c5ee35bad",
  type: "page-type/song",
  slug: "yaelokre-and-the-hound",
  title: "And the Hound",
  artist: "artist/yaelokre",
  performed: true,
} as const satisfies Song
