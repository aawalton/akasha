import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const siaReasonableWomanOneNight = {
  id: "01a0a59b-fa36-761d-9f71-f642128a2703",
  type: "track",
  slug: "sia-reasonable-woman-one-night",
  ownLength: 2.9765166666666665,
  ownProgress: 0,
  partOfCollections: ["release/sia-reasonable-woman"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4pAUkeeMXabkPNOsNfWANf",
      externalLink: "https://open.spotify.com/track/4pAUkeeMXabkPNOsNfWANf",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "One Night",
} as const satisfies Track
