import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysTheManger = {
  id: "01a0b780-2e28-779d-9ad6-3932facd7b08",
  type: "page-type/song",
  slug: "the-piano-guys-the-manger",
  title: "The Manger",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
