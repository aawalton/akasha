import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandePositionsPov = {
  id: "01a0a6c5-22d4-7cf5-b702-1aedf077776f",
  type: "page-type/track",
  slug: "ariana-grande-positions-pov",
  ownLength: 3.3647,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-positions"],
  position: 14,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3UoULw70kMsiVXxW0L3A33",
      externalLink: "https://open.spotify.com/track/3UoULw70kMsiVXxW0L3A33",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "pov",
  trackType: "studio",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "pov|66CXWjxzNUsdJxJ2JdwvnR|201882",
  song: "song/ariana-grande-pov",
} as const satisfies Track
