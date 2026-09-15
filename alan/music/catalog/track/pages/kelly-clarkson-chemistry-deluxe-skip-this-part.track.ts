import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeSkipThisPart = {
  id: "01a0a5ae-b5ce-77dd-bf35-5c64ca20ecf3",
  type: "track",
  slug: "kelly-clarkson-chemistry-deluxe-skip-this-part",
  ownLength: 3.6262166666666666,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry-deluxe"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0h7kuyAuVkl5Ssrdcbhz4Z",
      externalLink: "https://open.spotify.com/track/0h7kuyAuVkl5Ssrdcbhz4Z",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "skip this part",
} as const satisfies Track
