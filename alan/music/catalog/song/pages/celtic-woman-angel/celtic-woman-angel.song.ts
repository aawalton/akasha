import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanAngel = {
  id: "01a0b779-27ab-7c5e-b4f9-4d5608f5fd3e",
  type: "page-type/song",
  slug: "celtic-woman-angel",
  title: "Angel",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
