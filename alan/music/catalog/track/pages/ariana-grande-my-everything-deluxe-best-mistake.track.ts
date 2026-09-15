import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeBestMistake = {
  id: "01a0a6c5-2e07-7d12-8a41-993a7a678d07",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-best-mistake",
  ownLength: 3.89555,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "70yhaHLp9STtzI2Kzba6Tr",
      externalLink: "https://open.spotify.com/track/70yhaHLp9STtzI2Kzba6Tr",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Best Mistake",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "0c173mlxpT3dSFRgMO8XPh", artistName: "Big Sean" },
  ],
  trackKey: "bestmistake|0c173mlxpT3dSFRgMO8XPh,66CXWjxzNUsdJxJ2JdwvnR|233733",
} as const satisfies Track
