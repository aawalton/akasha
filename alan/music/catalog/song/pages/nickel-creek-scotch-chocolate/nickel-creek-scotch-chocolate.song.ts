import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekScotchChocolate = {
  id: "01a0caa8-aae9-7c72-8916-e2a1d812d7ef",
  type: "page-type/song",
  slug: "nickel-creek-scotch-chocolate",
  title: "Scotch & Chocolate",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
