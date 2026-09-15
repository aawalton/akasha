import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaReasonableWomanWannaBeKnown = {
  id: "01a0a59b-fa0d-77f2-8d92-381ddde4a1e4",
  type: "track",
  slug: "sia-reasonable-woman-wanna-be-known",
  ownLength: 3.7671333333333332,
  ownProgress: 0,
  partOfCollections: ["release/sia-reasonable-woman"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2xCPdhYKkmMvLhIrtdSFnd",
      externalLink: "https://open.spotify.com/track/2xCPdhYKkmMvLhIrtdSFnd",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Wanna Be Known",
} as const satisfies Track
