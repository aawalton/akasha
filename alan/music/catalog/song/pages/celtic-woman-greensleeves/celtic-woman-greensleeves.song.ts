import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanGreensleeves = {
  id: "01a0b779-49f6-745a-9469-97e08752adbf",
  type: "page-type/song",
  slug: "celtic-woman-greensleeves",
  title: "Greensleeves",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
