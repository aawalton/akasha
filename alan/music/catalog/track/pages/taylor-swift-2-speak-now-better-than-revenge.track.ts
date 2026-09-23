import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowBetterThanRevenge = {
  id: "01a0ce86-8ae4-78c2-91c7-dfc3e96a0636",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-better-than-revenge",
  ownLength: 3.6193333333333335,
  ownProgress: 3.6193333333333335,
  partOfCollections: [
    "release/taylor-swift-2-speak-now",
    "release/taylor-swift-2-speak-now-deluxe-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Better Than Revenge",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "betterthanrevenge|06HL4z0CvFAxyc27GXpf02|217160",
  song: "song/taylor-swift-better-than-revenge",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now",
      discNumber: 1,
      position: 10,
      externalId: "2ythurkTtSiyfK7GprJoFW",
      externalLink: "https://open.spotify.com/track/2ythurkTtSiyfK7GprJoFW",
    },
    {
      release: "release/taylor-swift-2-speak-now-deluxe-edition",
      discNumber: 1,
      position: 10,
      externalId: "1By2VQkUN0Frd8mKNV5NYC",
      externalLink: "https://open.spotify.com/track/1By2VQkUN0Frd8mKNV5NYC",
    },
  ],
} as const satisfies Track
