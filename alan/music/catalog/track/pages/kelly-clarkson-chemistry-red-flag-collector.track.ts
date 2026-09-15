import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryRedFlagCollector = {
  id: "01a0a5ae-b9f1-7fc8-885e-752bfe9ac447",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-red-flag-collector",
  ownLength: 2.982083333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6a0x5MhnYdjxaotPNKXUvW",
      externalLink: "https://open.spotify.com/track/6a0x5MhnYdjxaotPNKXUvW",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "red flag collector",
} as const satisfies Track
