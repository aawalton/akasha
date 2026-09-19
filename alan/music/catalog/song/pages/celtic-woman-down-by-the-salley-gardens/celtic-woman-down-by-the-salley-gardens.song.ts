import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanDownByTheSalleyGardens = {
  id: "01a0b779-2a3f-713d-9c89-8d487a53bbff",
  type: "page-type/song",
  slug: "celtic-woman-down-by-the-salley-gardens",
  title: "Down By The Salley Gardens",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
