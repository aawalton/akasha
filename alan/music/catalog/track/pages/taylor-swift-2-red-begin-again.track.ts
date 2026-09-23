import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2RedBeginAgain = {
  id: "01a0ce86-862a-7264-a65b-8f5ddcfa6aa6",
  type: "page-type/track",
  slug: "taylor-swift-2-red-begin-again",
  ownLength: 3.9602166666666667,
  ownProgress: 3.9602166666666667,
  partOfCollections: ["release/taylor-swift-2-red", "release/taylor-swift-2-red-deluxe-edition"],
  status: "completed",
  unit: "unit/minutes",
  title: "Begin Again",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "beginagain|06HL4z0CvFAxyc27GXpf02|237613",
  song: "song/taylor-swift-begin-again",
  carriedBy: [
    {
      release: "release/taylor-swift-2-red",
      discNumber: 1,
      position: 16,
      externalId: "0L4YCNRfXAoTvdpWeH2RGj",
      externalLink: "https://open.spotify.com/track/0L4YCNRfXAoTvdpWeH2RGj",
    },
    {
      release: "release/taylor-swift-2-red-deluxe-edition",
      discNumber: 1,
      position: 16,
      externalId: "48A0aShHlovDfTMucMrE66",
      externalLink: "https://open.spotify.com/track/48A0aShHlovDfTMucMrE66",
    },
  ],
} as const satisfies Track
