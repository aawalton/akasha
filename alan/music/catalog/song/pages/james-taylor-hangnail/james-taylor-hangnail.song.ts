import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const jamesTaylorHangnail = {
  id: "01a0b779-68fa-70b5-bcf6-c6246f8f66ca",
  type: "page-type/song",
  slug: "james-taylor-hangnail",
  title: "Hangnail",
  artist: "artist/james-taylor",
  performed: true,
} as const satisfies Song
