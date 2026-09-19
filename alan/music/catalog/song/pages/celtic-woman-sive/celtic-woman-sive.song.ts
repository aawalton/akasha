import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSive = {
  id: "01a0b771-5674-719a-a99b-2c2cc8558f5e",
  type: "page-type/song",
  slug: "celtic-woman-sive",
  title: "Sive",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
