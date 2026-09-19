import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysWithOrWithoutYou = {
  id: "01a0b780-5e8b-706c-9b1f-df8c73f716fb",
  type: "page-type/song",
  slug: "the-piano-guys-with-or-without-you",
  title: "With or Without You",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
