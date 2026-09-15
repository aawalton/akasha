import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonStrongerDeluxeVersionAlone = {
  id: "01a0a5ae-c3f7-732e-a081-1a0d61e1477c",
  type: "track",
  slug: "kelly-clarkson-stronger-deluxe-version-alone",
  ownLength: 3.017333333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-stronger-deluxe-version"],
  position: 15,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "42aFCTIefcZmfYL0mPsnwN",
      externalLink: "https://open.spotify.com/track/42aFCTIefcZmfYL0mPsnwN",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Alone",
} as const satisfies Track
