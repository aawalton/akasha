import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationEndGame = {
  id: "01a0ce86-72f1-77f2-96c4-6713d7c0db51",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-end-game",
  ownLength: 4.080433333333334,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-reputation"],
  status: "not-started",
  unit: "unit/minutes",
  title: "End Game",
  trackType: "studio",
  explicit: false,
  trackArtist: [
    { externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" },
    { externalId: "6eUKZXaKkcviH0Ku9w2n3V", artistName: "Ed Sheeran" },
    { externalId: "1RyvyyTE3xzB2ZywiAwp0i", artistName: "Future" },
  ],
  trackKey: "endgame|06HL4z0CvFAxyc27GXpf02,1RyvyyTE3xzB2ZywiAwp0i,6eUKZXaKkcviH0Ku9w2n3V|244826",
  song: "song/taylor-swift-end-game",
  carriedBy: [
    {
      release: "release/taylor-swift-2-reputation",
      discNumber: 1,
      position: 2,
      externalId: "2x0WlnmfG39ZuDmstl9xfX",
      externalLink: "https://open.spotify.com/track/2x0WlnmfG39ZuDmstl9xfX",
    },
  ],
} as const satisfies Track
