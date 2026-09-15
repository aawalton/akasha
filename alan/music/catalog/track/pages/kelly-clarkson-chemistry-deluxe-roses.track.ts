import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeRoses = {
  id: "01a0a5ae-b7e1-7ca0-9017-5bf63267ccc7",
  type: "track",
  slug: "kelly-clarkson-chemistry-deluxe-roses",
  ownLength: 3.5578166666666666,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry-deluxe"],
  position: 19,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "2g46efmE9mpxnkXP7sNkdh",
      externalLink: "https://open.spotify.com/track/2g46efmE9mpxnkXP7sNkdh",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "roses",
} as const satisfies Track
