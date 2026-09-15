import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawayWalkAway = {
  id: "01a0a5ae-cc0a-7bd5-ac19-ffaab987fb9b",
  type: "track",
  slug: "kelly-clarkson-breakaway-walk-away",
  ownLength: 3.1551,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  position: 8,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "25sA1vM4BFkTb5cJGWftFo",
      externalLink: "https://open.spotify.com/track/25sA1vM4BFkTb5cJGWftFo",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Walk Away",
} as const satisfies Track
