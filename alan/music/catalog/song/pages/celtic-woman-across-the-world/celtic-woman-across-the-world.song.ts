import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanAcrossTheWorld = {
  id: "01a0b779-4f20-7e05-9298-e7b4d4765d3f",
  type: "page-type/song",
  slug: "celtic-woman-across-the-world",
  title: "Across The World",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
