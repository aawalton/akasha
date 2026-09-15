import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeMyMistake = {
  id: "01a0a5ae-b6ef-7c2b-ace7-e5199fd80df5",
  type: "track",
  slug: "kelly-clarkson-chemistry-deluxe-my-mistake",
  ownLength: 3.27705,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry-deluxe"],
  position: 11,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5FafgdK8RntiA7xu2ZsuZZ",
      externalLink: "https://open.spotify.com/track/5FafgdK8RntiA7xu2ZsuZZ",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "my mistake",
} as const satisfies Track
