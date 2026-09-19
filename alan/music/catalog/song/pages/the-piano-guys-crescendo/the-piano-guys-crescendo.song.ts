import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysCrescendo = {
  id: "01a0b780-11b7-75dc-8f64-7ad8871b9b6c",
  type: "page-type/song",
  slug: "the-piano-guys-crescendo",
  title: "Crescendo",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
