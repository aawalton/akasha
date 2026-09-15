import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonBreakawayBehindTheseHazelEyes = {
  id: "01a0a5ae-cb83-7214-9bd0-30c8920edeaf",
  type: "track",
  slug: "kelly-clarkson-breakaway-behind-these-hazel-eyes",
  ownLength: 3.3162166666666666,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-breakaway"],
  position: 3,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0AKAxdNkwq9ZxRdW1DN9zW",
      externalLink: "https://open.spotify.com/track/0AKAxdNkwq9ZxRdW1DN9zW",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Behind These Hazel Eyes",
} as const satisfies Track
