import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const celticWomanRideOn = {
  id: "01a0b771-8fb5-76c6-b7b6-c2f99e41c79a",
  type: "page-type/song",
  slug: "celtic-woman-ride-on",
  title: "Ride On",
  artist: "artist/celtic-woman",
  performed: true,
} as const satisfies Song
