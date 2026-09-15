import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeRedFlagCollector = {
  id: "01a0a5ae-b70c-76ab-9fca-6fd1d76897c3",
  type: "track",
  slug: "kelly-clarkson-chemistry-deluxe-red-flag-collector",
  ownLength: 2.982083333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry-deluxe"],
  position: 12,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5fJm3A1gghJddHFBxo24dp",
      externalLink: "https://open.spotify.com/track/5fJm3A1gghJddHFBxo24dp",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "red flag collector",
} as const satisfies Track
