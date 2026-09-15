import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistryDeluxeDidYouKnow = {
  id: "01a0a5ae-b785-75b1-90ac-b8fa2f964d48",
  type: "track",
  slug: "kelly-clarkson-chemistry-deluxe-did-you-know",
  ownLength: 3.1512166666666666,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry-deluxe"],
  position: 16,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1RoXbREMm18VRMIlhepcmv",
      externalLink: "https://open.spotify.com/track/1RoXbREMm18VRMIlhepcmv",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "did you know",
} as const satisfies Track
