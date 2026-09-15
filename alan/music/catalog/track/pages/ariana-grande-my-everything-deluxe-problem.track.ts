import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const arianaGrandeMyEverythingDeluxeProblem = {
  id: "01a0a6c5-2d78-73c1-8f01-fc392485450f",
  type: "page-type/track",
  slug: "ariana-grande-my-everything-deluxe-problem",
  ownLength: 3.232,
  ownProgress: 0,
  partOfCollections: ["release/ariana-grande-my-everything-deluxe"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7vS3Y0IKjde7Xg85LWIEdP",
      externalLink: "https://open.spotify.com/track/7vS3Y0IKjde7Xg85LWIEdP",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Problem",
  discNumber: 1,
  explicit: false,
  trackArtist: [
    { externalId: "66CXWjxzNUsdJxJ2JdwvnR", artistName: "Ariana Grande" },
    { externalId: "5yG7ZAZafVaAlMTeBybKAL", artistName: "Iggy Azalea" },
  ],
  trackKey: "problem|5yG7ZAZafVaAlMTeBybKAL,66CXWjxzNUsdJxJ2JdwvnR|193920",
} as const satisfies Track
