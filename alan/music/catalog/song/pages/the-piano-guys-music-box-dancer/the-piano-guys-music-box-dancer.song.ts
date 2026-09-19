import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysMusicBoxDancer = {
  id: "01a0b780-77fe-73cd-b668-d7a0a5c1798e",
  type: "page-type/song",
  slug: "the-piano-guys-music-box-dancer",
  title: "Music Box Dancer",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
