import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2FearlessFifteen = {
  id: "01a0ce86-8f3d-742a-af80-3ba0bbfbcdb4",
  type: "page-type/track",
  slug: "taylor-swift-2-fearless-fifteen",
  ownLength: 4.90555,
  ownProgress: 4.90555,
  partOfCollections: ["release/taylor-swift-2-fearless"],
  status: "completed",
  unit: "unit/minutes",
  title: "Fifteen",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "fifteen|06HL4z0CvFAxyc27GXpf02|294333",
  song: "song/taylor-swift-fifteen",
  carriedBy: [
    {
      release: "release/taylor-swift-2-fearless",
      discNumber: 1,
      position: 2,
      externalId: "4t0OI7XrODjSkAu3bTPmWj",
      externalLink: "https://open.spotify.com/track/4t0OI7XrODjSkAu3bTPmWj",
    },
  ],
} as const satisfies Track
