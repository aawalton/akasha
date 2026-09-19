import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeAsLongAsYoureMine = {
  id: "01a0b770-03d5-7696-ba40-80a0896ed8ad",
  type: "page-type/song",
  slug: "ariana-grande-as-long-as-youre-mine",
  title: "As Long As You’re Mine",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
