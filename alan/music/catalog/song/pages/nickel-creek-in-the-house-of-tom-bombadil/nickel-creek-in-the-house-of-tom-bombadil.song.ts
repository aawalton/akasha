import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const nickelCreekInTheHouseOfTomBombadil = {
  id: "01a0caa8-bb2a-70ff-826a-423b04a23bd8",
  type: "page-type/song",
  slug: "nickel-creek-in-the-house-of-tom-bombadil",
  title: "In The House Of Tom Bombadil",
  artist: "artist/nickel-creek",
  performed: true,
} as const satisfies Song
