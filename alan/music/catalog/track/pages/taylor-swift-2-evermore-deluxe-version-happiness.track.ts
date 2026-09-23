import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2EvermoreDeluxeVersionHappiness = {
  id: "01a0ce86-5f4c-7238-ba1f-21ec61aaab23",
  type: "page-type/track",
  slug: "taylor-swift-2-evermore-deluxe-version-happiness",
  ownLength: 5.252433333333333,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-evermore-deluxe-version",
    "release/taylor-swift-2-evermore",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "happiness",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "happiness|06HL4z0CvFAxyc27GXpf02|315146",
  song: "song/taylor-swift-happiness",
  carriedBy: [
    {
      release: "release/taylor-swift-2-evermore",
      discNumber: 1,
      position: 7,
      externalId: "73YUReisjb3A9ActdLLjJQ",
      externalLink: "https://open.spotify.com/track/73YUReisjb3A9ActdLLjJQ",
    },
    {
      release: "release/taylor-swift-2-evermore-deluxe-version",
      discNumber: 1,
      position: 7,
      externalId: "55Vf4bimc1Rtfg0PAQRAo2",
      externalLink: "https://open.spotify.com/track/55Vf4bimc1Rtfg0PAQRAo2",
    },
  ],
} as const satisfies Track
