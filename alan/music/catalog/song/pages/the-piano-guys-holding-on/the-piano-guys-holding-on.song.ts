import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysHoldingOn = {
  id: "01a0b780-cd79-7528-817f-67aa9eb52609",
  type: "page-type/song",
  slug: "the-piano-guys-holding-on",
  title: "Holding On",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
