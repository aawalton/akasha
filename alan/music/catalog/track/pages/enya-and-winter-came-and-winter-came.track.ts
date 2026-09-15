import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const enyaAndWinterCameAndWinterCame = {
  id: "01a0a5b0-0e1b-78db-af47-a0da7132d43c",
  type: "track",
  slug: "enya-and-winter-came-and-winter-came",
  ownLength: 3.264,
  ownProgress: 0,
  partOfCollections: ["release/enya-and-winter-came"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1t05EZXOBxX0ZGuSByg1Qx",
      externalLink: "https://open.spotify.com/track/1t05EZXOBxX0ZGuSByg1Qx",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "And Winter Came...",
} as const satisfies Track
