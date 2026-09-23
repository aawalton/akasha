import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftCancelledTrackByTrack = {
  id: "01a0ce86-36a0-7c80-93d3-4cdf93e4a9d0",
  type: "page-type/song",
  slug: "taylor-swift-cancelled-track-by-track",
  title: "CANCELLED! - Track by Track",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
