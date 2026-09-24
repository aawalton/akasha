import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationDelicate = {
  id: "01a0ce86-7361-7ca5-81db-776ffcd2d2c9",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-delicate",
  ownLength: 3.8708833333333335,
  ownProgress: 3.8708833333333335,
  partOfCollections: ["release/taylor-swift-2-reputation"],
  status: "completed",
  unit: "unit/minutes",
  title: "Delicate",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "delicate|06HL4z0CvFAxyc27GXpf02|232253",
  song: "song/taylor-swift-delicate",
  carriedBy: [
    {
      release: "release/taylor-swift-2-reputation",
      discNumber: 1,
      position: 5,
      externalId: "6NFyWDv5CjfwuzoCkw47Xf",
      externalLink: "https://open.spotify.com/track/6NFyWDv5CjfwuzoCkw47Xf",
    },
  ],
} as const satisfies Track
