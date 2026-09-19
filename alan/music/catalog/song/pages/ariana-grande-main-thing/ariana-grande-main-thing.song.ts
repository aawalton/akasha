import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeMainThing = {
  id: "01a0b76f-f5ac-7dfb-a8de-33a2abd297c0",
  type: "page-type/song",
  slug: "ariana-grande-main-thing",
  title: "main thing",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
