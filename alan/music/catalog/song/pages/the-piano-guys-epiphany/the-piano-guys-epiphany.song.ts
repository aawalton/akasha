import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysEpiphany = {
  id: "01a0b780-4c0b-7234-ab4c-73a77d8390cd",
  type: "page-type/song",
  slug: "the-piano-guys-epiphany",
  title: "Epiphany",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
