import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeHighRoad = {
  id: "01a0a5ae-b60c-77e4-8679-20f207029aee",
  type: "track",
  slug: "kelly-clarkson-chemistry-deluxe-high-road",
  ownLength: 3.3185333333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry-deluxe"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "62gRm3NYPE6iHjSBAG4yAv",
      externalLink: "https://open.spotify.com/track/62gRm3NYPE6iHjSBAG4yAv",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "high road",
} as const satisfies Track
