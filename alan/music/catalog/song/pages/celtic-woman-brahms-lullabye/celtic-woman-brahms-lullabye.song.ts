import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanBrahmsLullabye = {
  id: "01a0b779-1842-7385-95a1-5ec5c9139e55",
  type: "page-type/song",
  slug: "celtic-woman-brahms-lullabye",
  title: "Brahm's Lullabye",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
