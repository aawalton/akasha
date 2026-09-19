import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSuantrai = {
  id: "01a0b779-1bd1-7639-9719-8a8149c44c16",
  type: "page-type/song",
  slug: "celtic-woman-suantrai",
  title: "Suantraí",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
