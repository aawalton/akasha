import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysCelloopa = {
  id: "01a0b780-cbab-7878-b05c-2a9f1ac1e796",
  type: "page-type/song",
  slug: "the-piano-guys-celloopa",
  title: "Celloopa",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
