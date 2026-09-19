import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const vinnyMarchiTakeMeBackToYou = {
  id: "01a0b783-c011-7bb6-8b0a-43b1b80c32a5",
  type: "page-type/song",
  slug: "vinny-marchi-take-me-back-to-you",
  title: "Take Me Back To You",
  artist: "artist/vinny-marchi",
  performed: true,
} as const satisfies Song
