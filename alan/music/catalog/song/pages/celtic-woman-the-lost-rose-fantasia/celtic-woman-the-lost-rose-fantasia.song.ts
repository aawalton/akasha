import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanTheLostRoseFantasia = {
  id: "01a0b779-3c16-7430-9dc9-12ba3d8d8433",
  type: "page-type/song",
  slug: "celtic-woman-the-lost-rose-fantasia",
  title: "The Lost Rose Fantasia",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
