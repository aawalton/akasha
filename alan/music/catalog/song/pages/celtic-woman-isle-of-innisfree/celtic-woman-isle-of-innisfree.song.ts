import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanIsleOfInnisfree = {
  id: "01a0b771-69de-77a2-a689-5aa54bf0fbb4",
  type: "page-type/song",
  slug: "celtic-woman-isle-of-innisfree",
  title: "Isle Of Innisfree",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
