import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const thePianoGuysWakeMeUpBeforeYouGoGo = {
  id: "01a0b780-1fc3-7e2e-a978-066ca8f9ad59",
  type: "page-type/song",
  slug: "the-piano-guys-wake-me-up-before-you-go-go",
  title: "Wake Me Up Before You Go-Go",
  artist: "artist/the-piano-guys",
  performed: true,
} as const satisfies Song
