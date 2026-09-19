import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheButterfly = {
  id: "01a0b771-719d-7287-abe5-1bc13ea8121b",
  type: "page-type/song",
  slug: "celtic-woman-the-butterfly",
  title: "The Butterfly",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
