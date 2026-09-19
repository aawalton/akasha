import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysTheJungleBookSarabande = {
  id: "01a0b780-d099-77fd-a015-4d889fd81554",
  type: "page-type/song",
  slug: "the-piano-guys-the-jungle-book-sarabande",
  title: "The Jungle Book / Sarabande",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
