import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const emei9Lives = {
  id: "01a0c43e-7821-71f9-9277-8a1383532dea",
  type: "page-type/song",
  slug: "emei-9-lives",
  title: "9 LIVES",
  artist: "artist/emei",
  performed: true,
} as const satisfies Song
