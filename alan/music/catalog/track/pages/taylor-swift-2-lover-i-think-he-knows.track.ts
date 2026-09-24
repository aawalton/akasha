import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverIThinkHeKnows = {
  id: "01a0ce86-6ea1-7074-9d4c-675341d1b043",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-i-think-he-knows",
  ownLength: 2.8897666666666666,
  ownProgress: 2.8897666666666666,
  partOfCollections: ["release/taylor-swift-2-lover"],
  status: "completed",
  unit: "unit/minutes",
  title: "I Think He Knows",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "ithinkheknows|06HL4z0CvFAxyc27GXpf02|173386",
  song: "song/taylor-swift-i-think-he-knows",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover",
      discNumber: 1,
      position: 6,
      externalId: "2YWtcWi3a83pdEg3Gif4Pd",
      externalLink: "https://open.spotify.com/track/2YWtcWi3a83pdEg3Gif4Pd",
    },
  ],
} as const satisfies Track
