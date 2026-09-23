import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowDearJohn = {
  id: "01a0ce86-8a12-748c-9b58-675c429b9d4d",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-dear-john",
  ownLength: 6.732,
  ownProgress: 6.732,
  partOfCollections: [
    "release/taylor-swift-2-speak-now",
    "release/taylor-swift-2-speak-now-deluxe-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Dear John",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "dearjohn|06HL4z0CvFAxyc27GXpf02|403920",
  song: "song/taylor-swift-dear-john",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now",
      discNumber: 1,
      position: 5,
      externalId: "7hZuICN5eaCuQyp443RCt6",
      externalLink: "https://open.spotify.com/track/7hZuICN5eaCuQyp443RCt6",
    },
    {
      release: "release/taylor-swift-2-speak-now-deluxe-edition",
      discNumber: 1,
      position: 5,
      externalId: "1ubvV5ECkm6nSI6g1HmbBK",
      externalLink: "https://open.spotify.com/track/1ubvV5ECkm6nSI6g1HmbBK",
    },
  ],
} as const satisfies Track
