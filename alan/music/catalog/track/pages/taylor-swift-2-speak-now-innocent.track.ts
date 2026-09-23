import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2SpeakNowInnocent = {
  id: "01a0ce86-8b0d-7f14-b39c-5cee8bc7d708",
  type: "page-type/track",
  slug: "taylor-swift-2-speak-now-innocent",
  ownLength: 5.03755,
  ownProgress: 5.03755,
  partOfCollections: [
    "release/taylor-swift-2-speak-now",
    "release/taylor-swift-2-speak-now-deluxe-edition",
  ],
  status: "completed",
  unit: "unit/minutes",
  title: "Innocent",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "innocent|06HL4z0CvFAxyc27GXpf02|302253",
  song: "song/taylor-swift-innocent",
  carriedBy: [
    {
      release: "release/taylor-swift-2-speak-now",
      discNumber: 1,
      position: 11,
      externalId: "5GPwN5iZ9ZMSXAkppj4Uvv",
      externalLink: "https://open.spotify.com/track/5GPwN5iZ9ZMSXAkppj4Uvv",
    },
    {
      release: "release/taylor-swift-2-speak-now-deluxe-edition",
      discNumber: 1,
      position: 11,
      externalId: "3kfgJql90tzgoxByioAMXR",
      externalLink: "https://open.spotify.com/track/3kfgJql90tzgoxByioAMXR",
    },
  ],
} as const satisfies Track
