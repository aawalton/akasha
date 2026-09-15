import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawayAddicted = {
  id: "01a0a5ae-cbd4-7392-b585-f721ad800838",
  type: "track",
  slug: "kelly-clarkson-breakaway-addicted",
  ownLength: 3.9566666666666666,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  position: 6,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4qGGfl1Y4pLeerhRaI2MIq",
      externalLink: "https://open.spotify.com/track/4qGGfl1Y4pLeerhRaI2MIq",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Addicted",
} as const satisfies Track
