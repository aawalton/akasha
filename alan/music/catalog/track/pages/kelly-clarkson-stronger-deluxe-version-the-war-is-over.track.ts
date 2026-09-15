import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonStrongerDeluxeVersionTheWarIsOver = {
  id: "01a0a5ae-c35c-7998-8a84-30e869159f40",
  type: "page-type/track",
  slug: "kelly-clarkson-stronger-deluxe-version-the-war-is-over",
  ownLength: 3.949333333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-stronger-deluxe-version"],
  position: 10,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4chXOc9JIBUKs1JXX2yimY",
      externalLink: "https://open.spotify.com/track/4chXOc9JIBUKs1JXX2yimY",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "The War Is Over",
} as const satisfies Track
