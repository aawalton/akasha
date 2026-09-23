import type { Song } from "akasha/alan/music/catalog/song/song.page-type.types.ts"

export const taylorSwiftWoodTrackByTrack = {
  id: "01a0ce86-362b-7e1b-8827-9b8410657912",
  type: "page-type/song",
  slug: "taylor-swift-wood-track-by-track",
  title: "Wood - Track by Track",
  artist: "artist/taylor-swift",
  performed: true,
} as const satisfies Song
