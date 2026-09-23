import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftHoneyTrackByTrack = {
  id: "01a0ce86-3714-76cc-9c37-bc49a07686dc",
  type: "page-type/song",
  slug: "taylor-swift-honey-track-by-track",
  title: "Honey - Track by Track",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
