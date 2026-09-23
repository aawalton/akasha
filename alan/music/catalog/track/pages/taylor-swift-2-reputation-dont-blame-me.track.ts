import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2ReputationDontBlameMe = {
  id: "01a0ce86-733c-7ff3-b143-4f992e5354e7",
  type: "page-type/track",
  slug: "taylor-swift-2-reputation-dont-blame-me",
  ownLength: 3.9402166666666667,
  ownProgress: 0,
  partOfCollections: ["release/taylor-swift-2-reputation"],
  status: "not-started",
  unit: "unit/minutes",
  title: "Don’t Blame Me",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "dontblameme|06HL4z0CvFAxyc27GXpf02|236413",
  song: "song/taylor-swift-don-t-blame-me",
  carriedBy: [
    {
      release: "release/taylor-swift-2-reputation",
      discNumber: 1,
      position: 4,
      externalId: "1R0a2iXumgCiFb7HEZ7gUE",
      externalLink: "https://open.spotify.com/track/1R0a2iXumgCiFb7HEZ7gUE",
    },
  ],
} as const satisfies Track
