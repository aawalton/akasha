import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysWalkingTheWireLargo = {
  id: "01a0b780-54f3-7719-9e4f-706689e197f8",
  type: "page-type/song",
  slug: "the-piano-guys-walking-the-wire-largo",
  title: "Walking the Wire / Largo",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
