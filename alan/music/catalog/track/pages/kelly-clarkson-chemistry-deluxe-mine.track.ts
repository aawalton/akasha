import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeMine = {
  id: "01a0a5ae-b5e9-7d98-8b9c-3486236a0f11",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-deluxe-mine",
  ownLength: 3.18345,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry-deluxe"],
  position: 2,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1x17xorFkQKwIkmPAO77a9",
      externalLink: "https://open.spotify.com/track/1x17xorFkQKwIkmPAO77a9",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "mine",
} as const satisfies Track
