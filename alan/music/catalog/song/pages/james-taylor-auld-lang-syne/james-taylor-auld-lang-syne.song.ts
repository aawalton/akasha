import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorAuldLangSyne = {
  id: "01a0b779-8490-7e30-9fe0-d884d777e565",
  type: "page-type/song",
  slug: "james-taylor-auld-lang-syne",
  title: "Auld Lang Syne",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
