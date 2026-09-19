import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsDeluxePov = {
  id: "01a0a6c5-205f-783b-b4f3-079b73d0f0df",
  type: "page-type/track",
  slug: "ariana-grande-positions-deluxe-pov",
  ownLength: 3.3647,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-positions-deluxe"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3RP1eXaK8f4rwqY9fRKVRF",
      externalLink: "https://open.spotify.com/track/3RP1eXaK8f4rwqY9fRKVRF",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "pov",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "pov|66CXWjxzNUsdJxJ2JdwvnR|201882",
  song: "song/ariana-grande-pov",
} as const satisfies Track
