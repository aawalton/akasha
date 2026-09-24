import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationReadyForIt = {
  id: "01a0ce86-72cd-7db9-9d55-cead9707e171",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-ready-for-it",
  ownLength: 3.4697666666666667,
  ownProgress: 3.4697666666666667,
  partOfCollections: ["release/taylor-swift-2-reputation"],
  status: "completed",
  unit: "unit/minutes",
  title: "...Ready For It?",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/taylor-swift" }],
  trackKey: "readyforit|06HL4z0CvFAxyc27GXpf02|208186",
  song: "song/taylor-swift-ready-for-it",
  carriedBy: [
    {
      release: "release/taylor-swift-2-reputation",
      discNumber: 1,
      position: 1,
      externalId: "2yLa0QULdQr0qAIvVwN6B5",
      externalLink: "https://open.spotify.com/track/2yLa0QULdQr0qAIvVwN6B5",
    },
  ],
} as const satisfies Track
