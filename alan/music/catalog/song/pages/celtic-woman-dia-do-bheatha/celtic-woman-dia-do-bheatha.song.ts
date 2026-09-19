import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanDiaDoBheatha = {
  id: "01a0b779-48be-7599-ace3-19058ce7f7d9",
  type: "page-type/song",
  slug: "celtic-woman-dia-do-bheatha",
  title: "Dia Do Bheatha",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
