import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxePov = {
  id: "01a0a6c5-205f-783b-b4f3-079b73d0f0df",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-pov",
  ownLength: 3.3647,
  ownProgress: 3.3647,
  partOfCollections: ["release/ariana-grande-positions-deluxe", "release/ariana-grande-positions"],
  status: "completed",
  unit: "unit/minutes",
  title: "pov",
  trackType: "studio",
  explicit: false,
  trackArtist: [{ artist: "artist/ariana-grande" }],
  trackKey: "pov|66CXWjxzNUsdJxJ2JdwvnR|201882",
  song: "song/ariana-grande-pov",
  carriedBy: [
    {
      release: "release/ariana-grande-positions",
      discNumber: 1,
      position: 14,
      externalId: "3UoULw70kMsiVXxW0L3A33",
      externalLink: "https://open.spotify.com/track/3UoULw70kMsiVXxW0L3A33",
    },
    {
      release: "release/ariana-grande-positions-deluxe",
      discNumber: 1,
      position: 14,
      externalId: "3RP1eXaK8f4rwqY9fRKVRF",
      externalLink: "https://open.spotify.com/track/3RP1eXaK8f4rwqY9fRKVRF",
    },
  ],
} as const satisfies Track
