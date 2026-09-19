import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const theHoldernessFamilyPumpkinSpiceLatte = {
  id: "01a0b77f-ce7b-788c-b3d1-eb2342e19d72",
  type: "page-type/song",
  slug: "the-holderness-family-pumpkin-spice-latte",
  title: "Pumpkin Spice Latte",
  artist: "artist/the-holderness-family",
  performed: true,
} as const satisfies Song
