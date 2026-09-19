import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysDna = {
  id: "01a0b780-4ad9-72ce-9b58-342fa22e182e",
  type: "page-type/song",
  slug: "the-piano-guys-dna",
  title: "DNA",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
