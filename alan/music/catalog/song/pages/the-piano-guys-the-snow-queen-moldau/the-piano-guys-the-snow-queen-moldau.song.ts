import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysTheSnowQueenMoldau = {
  id: "01a0b780-c6db-7345-b4da-0c18b3def74b",
  type: "page-type/song",
  slug: "the-piano-guys-the-snow-queen-moldau",
  title: "The Snow Queen (Moldau)",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
