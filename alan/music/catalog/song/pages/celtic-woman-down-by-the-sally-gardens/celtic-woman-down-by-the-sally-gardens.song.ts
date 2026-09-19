import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanDownByTheSallyGardens = {
  id: "01a0b779-35ee-7b51-a03d-d2c5313cdeca",
  type: "page-type/song",
  slug: "celtic-woman-down-by-the-sally-gardens",
  title: "Down by the Sally Gardens",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
