import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineSlightlyDeluxeAndAlsoLiveSupernaturalLiveVersion = {
  id: "01a0a6c5-15a1-72ef-b204-471ffe2d2d7e",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-slightly-deluxe-and-also-live-supernatural-live-version",
  ownLength: 2.7262333333333335,
  ownProgress: 2.7262333333333335,
  partOfCollections: [
    "release/ariana-grande-eternal-sunshine-slightly-deluxe-and-also-live",
    "release/ariana-grande-supernatural",
  ],
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0FnkhFA4h80IYaYGgKFI2M",
      externalLink: "https://open.spotify.com/track/0FnkhFA4h80IYaYGgKFI2M",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "supernatural - live version",
  trackType: "live",
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "supernaturalliveversion|66CXWjxzNUsdJxJ2JdwvnR|163574",
  song: "song/ariana-grande-supernatural",
  carriedBy: [
    {
      release: "release/ariana-grande-eternal-sunshine-slightly-deluxe-and-also-live",
      discNumber: 1,
      position: 21,
      externalId: "0FnkhFA4h80IYaYGgKFI2M",
      externalLink: "https://open.spotify.com/track/0FnkhFA4h80IYaYGgKFI2M",
    },
    {
      release: "release/ariana-grande-supernatural",
      discNumber: 1,
      position: 3,
      externalId: "7LJAKnc0kpHkU0smvsEe6c",
      externalLink: "https://open.spotify.com/track/7LJAKnc0kpHkU0smvsEe6c",
    },
  ],
} as const satisfies Track
