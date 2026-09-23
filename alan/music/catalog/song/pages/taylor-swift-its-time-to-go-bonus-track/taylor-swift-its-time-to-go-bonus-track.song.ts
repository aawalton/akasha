import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftItsTimeToGoBonusTrack = {
  id: "01a0ce86-5e23-76ff-b64a-620936842c5b",
  type: "page-type/song",
  slug: "taylor-swift-its-time-to-go-bonus-track",
  title: "it’s time to go - bonus track",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
