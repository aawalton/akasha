import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysSeptember = {
  id: "01a0b780-41ab-7a0f-9a86-ec0b45e71155",
  type: "page-type/song",
  slug: "the-piano-guys-september",
  title: "September",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
