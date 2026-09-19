import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const arianaGrandeStepOnUp = {
  id: "01a0b76f-dd51-7ecf-ad6f-ad3c977caaff",
  type: "page-type/song",
  slug: "ariana-grande-step-on-up",
  title: "Step On Up",
  artist: "artist/ariana-grande",
  performed: true,
} as const satisfies Song
