import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekElsie = {
  id: "01a0caa8-b0d9-7840-a91a-f2b8c2433b7e",
  type: "page-type/song",
  slug: "nickel-creek-elsie",
  title: "Elsie",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
