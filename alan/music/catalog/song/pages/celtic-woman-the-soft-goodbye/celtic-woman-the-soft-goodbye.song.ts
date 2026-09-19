import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheSoftGoodbye = {
  id: "01a0b771-72d5-71c8-83cb-92e4e2a16e40",
  type: "page-type/song",
  slug: "celtic-woman-the-soft-goodbye",
  title: "The Soft Goodbye",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
