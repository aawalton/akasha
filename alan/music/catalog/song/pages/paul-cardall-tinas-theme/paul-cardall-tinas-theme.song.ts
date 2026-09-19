import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const paulCardallTinasTheme = {
  id: "01a0b77e-b933-7148-a2b3-265c3c9736a3",
  type: "page-type/song",
  slug: "paul-cardall-tinas-theme",
  title: "Tina’s Theme",
  artist: "artist/paul-cardall",
  performed: true,
} as const satisfies Song
