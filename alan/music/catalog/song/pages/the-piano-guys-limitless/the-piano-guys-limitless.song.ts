import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysLimitless = {
  id: "01a0b780-4fb1-76e6-8aca-bdc05ef57229",
  type: "page-type/song",
  slug: "the-piano-guys-limitless",
  title: "Limitless",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
