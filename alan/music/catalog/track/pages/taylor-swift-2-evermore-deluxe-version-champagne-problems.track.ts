import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const taylorSwift2EvermoreDeluxeVersionChampagneProblems = {
  id: "01a0ce86-5e82-7354-aeb7-960d2e72fd69",
  type: "page-type/track",
  slug: "taylor-swift-2-evermore-deluxe-version-champagne-problems",
  ownLength: 4.066666666666666,
  ownProgress: 0,
  partOfCollections: [
    "release/taylor-swift-2-evermore-deluxe-version",
    "release/taylor-swift-2-evermore",
  ],
  status: "not-started",
  unit: "unit/minutes",
  title: "champagne problems",
  trackType: "studio",
  explicit: true,
  trackArtist: [{ externalId: "06HL4z0CvFAxyc27GXpf02", artistName: "Taylor Swift" }],
  trackKey: "champagneproblems|06HL4z0CvFAxyc27GXpf02|244000",
  song: "song/taylor-swift-champagne-problems",
  carriedBy: [
    {
      release: "release/taylor-swift-2-evermore",
      discNumber: 1,
      position: 2,
      externalId: "0sY6ZUTh4yoctD8VIXz339",
      externalLink: "https://open.spotify.com/track/0sY6ZUTh4yoctD8VIXz339",
    },
    {
      release: "release/taylor-swift-2-evermore-deluxe-version",
      discNumber: 1,
      position: 2,
      externalId: "1gcyHQpBQ1lfXGdhZmWrHP",
      externalLink: "https://open.spotify.com/track/1gcyHQpBQ1lfXGdhZmWrHP",
    },
  ],
} as const satisfies Track
