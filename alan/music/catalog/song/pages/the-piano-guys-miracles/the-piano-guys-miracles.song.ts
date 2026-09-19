import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysMiracles = {
  id: "01a0b780-50dc-77dd-9442-a08d7a6c4c16",
  type: "page-type/song",
  slug: "the-piano-guys-miracles",
  title: "Miracles",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
