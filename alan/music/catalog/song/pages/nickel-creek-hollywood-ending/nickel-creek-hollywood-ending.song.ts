import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekHollywoodEnding = {
  id: "01a0caa8-a987-7775-abd8-c4d145316fd6",
  type: "page-type/song",
  slug: "nickel-creek-hollywood-ending",
  title: "Hollywood Ending",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
