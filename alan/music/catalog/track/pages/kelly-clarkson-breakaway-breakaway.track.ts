import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawayBreakaway = {
  id: "01a0a5ae-cb4c-7e71-9e07-d8bbd2448566",
  type: "track",
  slug: "kelly-clarkson-breakaway-breakaway",
  ownLength: 3.95,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "61Qhe2mHSLhUE04QeK4lkD",
      externalLink: "https://open.spotify.com/track/61Qhe2mHSLhUE04QeK4lkD",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Breakaway",
} as const satisfies Track
