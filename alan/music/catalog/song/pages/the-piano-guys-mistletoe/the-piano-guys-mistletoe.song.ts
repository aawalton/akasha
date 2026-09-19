import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysMistletoe = {
  id: "01a0b780-7641-7488-a68e-a39ca9898e69",
  type: "page-type/song",
  slug: "the-piano-guys-mistletoe",
  title: "Mistletoe",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
