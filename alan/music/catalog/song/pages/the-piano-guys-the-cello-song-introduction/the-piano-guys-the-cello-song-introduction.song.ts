import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysTheCelloSongIntroduction = {
  id: "01a0b780-59c4-7caa-859b-ef62335994bd",
  type: "page-type/song",
  slug: "the-piano-guys-the-cello-song-introduction",
  title: "The Cello Song (Introduction)",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
