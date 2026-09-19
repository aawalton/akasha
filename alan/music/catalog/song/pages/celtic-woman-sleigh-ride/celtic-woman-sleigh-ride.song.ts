import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanSleighRide = {
  id: "01a0b779-4c5b-7eff-a1f4-39eb70e36094",
  type: "page-type/song",
  slug: "celtic-woman-sleigh-ride",
  title: "Sleigh Ride",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
