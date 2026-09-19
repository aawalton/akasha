import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeNoGoodDeed = {
  id: "01a0b770-0fe3-7be4-aecb-4f04b3a22de7",
  type: "page-type/song",
  slug: "ariana-grande-no-good-deed",
  title: "No Good Deed",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
