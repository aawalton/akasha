import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysSolace = {
  id: "01a0b783-78d0-7e62-981b-8ad6dc216143",
  type: "page-type/song",
  slug: "the-piano-guys-solace",
  title: "Solace",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
