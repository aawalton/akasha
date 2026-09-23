import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowMean = {
  id: "01a0ce86-8a3b-790f-99cb-3d7fe73b82e6",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-mean",
  ownLength: 3.9622166666666665,
  ownProgress: 3.9622166666666665,
  partOfCollections: [
    "release/taylor-swift-2-speak-now",
    "release/taylor-swift-2-speak-now-deluxe-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Mean",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "mean|06HL4z0CvFAxyc27GXpf02|237733",
  song: "song/taylor-swift-mean",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now",
      discNumber: 1,
      position: 6,
      externalId: "5yEPktRqvIhko5QFF3aBhQ",
      externalLink: "https://open.spotify.com/track/5yEPktRqvIhko5QFF3aBhQ",
    },
    {
      release: "release/taylor-swift-2-speak-now-deluxe-edition",
      discNumber: 1,
      position: 6,
      externalId: "4N60XfcTE1ysLZGbYgnYXq",
      externalLink: "https://open.spotify.com/track/4N60XfcTE1ysLZGbYgnYXq",
    },
  ],
} as const satisfies Track
