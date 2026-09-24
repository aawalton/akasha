import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const adeleWhenWeWereYoung = {
  id: "01a0d52b-c259-7971-b0ad-8d4b8f0a8851",
  type: "page-type/song",
  slug: "adele-when-we-were-young",
  title: "When We Were Young",
  artist: "artist/adele",
  performed: true,
} as const satisfies Song
