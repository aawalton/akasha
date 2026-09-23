import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2LoverLiveFromParisLoverLiveFromParis = {
  id: "01a0ce86-a630-7104-b9de-4176da8c5167",
  type: "page-type/track",
  slug: "taylor-swift-2-lover-live-from-paris-lover-live-from-paris",
  ownLength: 3.828883333333333,
  ownProgress: 3.828883333333333,
  partOfCollections: ["release/taylor-swift-2-lover-live-from-paris"],
  status: "completed",
  unit: "unit/minutes",
  title: "Lover - Live From Paris",
  trackType: "live",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "loverlivefromparis|06HL4z0CvFAxyc27GXpf02|229733",
  song: "song/taylor-swift-lover",
  carriedBy: [
    {
      release: "release/taylor-swift-2-lover-live-from-paris",
      discNumber: 1,
      position: 1,
      externalId: "4lD3RXyvHpJsM3BhIEC4aA",
      externalLink: "https://open.spotify.com/track/4lD3RXyvHpJsM3BhIEC4aA",
    },
  ],
} as const satisfies Track
