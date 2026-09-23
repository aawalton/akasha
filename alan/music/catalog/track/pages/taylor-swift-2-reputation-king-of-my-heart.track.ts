import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationKingOfMyHeart = {
  id: "01a0ce86-741c-79dd-ac39-92d606f76c65",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-king-of-my-heart",
  ownLength: 3.572,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-reputation"],
  status: "not-started",
  unit: "unit/minutes",
  title: "King Of My Heart",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "kingofmyheart|06HL4z0CvFAxyc27GXpf02|214320",
  song: "song/taylor-swift-king-of-my-heart",
  carriedBy: [
    {
      release: "release/taylor-swift-2-reputation",
      discNumber: 1,
      position: 10,
      externalId: "7HuBDWi18s4aJM8UFnNheH",
      externalLink: "https://open.spotify.com/track/7HuBDWi18s4aJM8UFnNheH",
    },
  ],
} as const satisfies Track
