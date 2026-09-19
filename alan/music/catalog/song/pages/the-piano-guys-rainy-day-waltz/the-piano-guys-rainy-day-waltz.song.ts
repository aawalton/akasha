import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysRainyDayWaltz = {
  id: "01a0b780-4078-7e18-b31a-6c02d0a2dcea",
  type: "page-type/song",
  slug: "the-piano-guys-rainy-day-waltz",
  title: "Rainy Day Waltz",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
