import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawayBecauseOfYou = {
  id: "01a0a5ae-cb9e-7e95-a8d1-9e3f822d0b7e",
  type: "page-type/track",
  slug: "kelly-clarkson-breakaway-because-of-you",
  ownLength: 3.6582166666666667,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  position: 4,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "3f3omU8n47Mqyab5nCaGyT",
      externalLink: "https://open.spotify.com/track/3f3omU8n47Mqyab5nCaGyT",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Because of You",
} as const satisfies Track
