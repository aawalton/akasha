import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeTouchIt = {
  id: "01a0b76f-dfe5-7daf-8265-8d1fe36a61c0",
  type: "page-type/song",
  slug: "ariana-grande-touch-it",
  title: "Touch It",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
