import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawayBeautifulDisasterLive = {
  id: "01a0a5ae-cc76-7087-b464-e235d3e14522",
  type: "track",
  slug: "kelly-clarkson-breakaway-beautiful-disaster-live",
  ownLength: 4.624883333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "30bC3YZlG6JggfU5A6xoaI",
      externalLink: "https://open.spotify.com/track/30bC3YZlG6JggfU5A6xoaI",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Beautiful Disaster - Live",
} as const satisfies Track
