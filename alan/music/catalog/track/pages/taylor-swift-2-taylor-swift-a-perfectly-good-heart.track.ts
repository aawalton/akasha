import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2TaylorSwiftAPerfectlyGoodHeart = {
  id: "01a0ce86-9732-7bc5-afa9-8cb50fd0fc88",
  type: "page-type/track",
  slug: "taylor-swift-2-taylor-swift-a-perfectly-good-heart",
  ownLength: 3.6691,
  ownProgress: 3.6691,
  partOfCollections: ["release/taylor-swift-2-taylor-swift"],
  status: "completed",
  unit: "unit/minutes",
  title: "A Perfectly Good Heart",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "aperfectlygoodheart|06HL4z0CvFAxyc27GXpf02|220146",
  song: "song/taylor-swift-a-perfectly-good-heart",
  carriedBy: [
    {
      release: "release/taylor-swift-2-taylor-swift",
      discNumber: 1,
      position: 14,
      externalId: "1spLfUJxtyVyiKKTegQ2r4",
      externalLink: "https://open.spotify.com/track/1spLfUJxtyVyiKKTegQ2r4",
    },
  ],
} as const satisfies Track
