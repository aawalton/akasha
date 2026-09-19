import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeEternalSunshineSlightlyDeluxeAndAlsoLiveSupernatural = {
  id: "01a0a6c5-13eb-7096-b1f3-d592fe20965c",
  type: "page-type/track",
  slug: "ariana-grande-eternal-sunshine-slightly-deluxe-and-also-live-supernatural",
  ownLength: 2.7230166666666666,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-eternal-sunshine-slightly-deluxe-and-also-live"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1MrnFWBjQCaaeOc7dhR8Bc",
      externalLink: "https://open.spotify.com/track/1MrnFWBjQCaaeOc7dhR8Bc",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "supernatural",
  discNumber: 1,
  explicit: false,
  trackArtist: [{ externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" }],
  trackKey: "supernatural|66CXWjxzNUsdJxJ2JdwvnR|163381",
  song: "song/ariana-grande-supernatural",
} as const satisfies Track
