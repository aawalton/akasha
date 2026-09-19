import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeFreak = {
  id: "01a0b76f-ea3a-7b92-8255-dad0916c768a",
  type: "page-type/song",
  slug: "ariana-grande-freak",
  title: "freak",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
