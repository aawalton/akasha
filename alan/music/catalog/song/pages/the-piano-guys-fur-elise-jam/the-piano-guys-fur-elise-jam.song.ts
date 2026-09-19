import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysFurEliseJam = {
  id: "01a0b77f-ffe8-7b1e-9dc9-c22f6303e607",
  type: "page-type/song",
  slug: "the-piano-guys-fur-elise-jam",
  title: "Für Elise Jam",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
