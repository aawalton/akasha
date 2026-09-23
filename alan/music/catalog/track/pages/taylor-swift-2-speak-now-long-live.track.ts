import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowLongLive = {
  id: "01a0ce86-8948-735a-8c8b-431d7ce3363b",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-long-live",
  ownLength: 5.2991,
  ownProgress: 5.2991,
  partOfCollections: ["release/taylor-swift-2-speak-now"],
  status: "completed",
  unit: "unit/minutes",
  title: "Long Live",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "longlive|06HL4z0CvFAxyc27GXpf02|317946",
  song: "song/taylor-swift-long-live",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now",
      discNumber: 1,
      position: 14,
      externalId: "6XDBA3QWX51lDJ0oZbaJJN",
      externalLink: "https://open.spotify.com/track/6XDBA3QWX51lDJ0oZbaJJN",
    },
  ],
} as const satisfies Track
