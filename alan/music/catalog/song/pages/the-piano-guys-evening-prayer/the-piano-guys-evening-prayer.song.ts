import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysEveningPrayer = {
  id: "01a0b780-d80d-74c3-9705-242a6ac3a8aa",
  type: "page-type/song",
  slug: "the-piano-guys-evening-prayer",
  title: "Evening Prayer",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
