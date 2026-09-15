import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonStrongerDeluxeVersionMrKnowItAll = {
  id: "01a0a5ae-c239-72d4-8f47-534a895c0e60",
  type: "track",
  slug: "kelly-clarkson-stronger-deluxe-version-mr-know-it-all",
  ownLength: 3.8753333333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-stronger-deluxe-version"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7uRznL3LcuazKpwCTpDltz",
      externalLink: "https://open.spotify.com/track/7uRznL3LcuazKpwCTpDltz",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Mr. Know It All",
} as const satisfies Track
