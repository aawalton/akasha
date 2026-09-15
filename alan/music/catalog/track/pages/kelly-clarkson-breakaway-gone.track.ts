import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawayGone = {
  id: "01a0a5ae-cbb8-7eb4-b1a8-c55d544ed458",
  type: "track",
  slug: "kelly-clarkson-breakaway-gone",
  ownLength: 3.431766666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Canmwvufsc7bMM3v2c286",
      externalLink: "https://open.spotify.com/track/5Canmwvufsc7bMM3v2c286",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Gone",
} as const satisfies Track
