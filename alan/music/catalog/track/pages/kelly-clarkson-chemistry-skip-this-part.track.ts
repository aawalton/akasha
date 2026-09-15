import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChemistrySkipThisPart = {
  id: "01a0a5ae-b869-7504-8887-01b4c3d93c18",
  type: "page-type/track",
  slug: "kelly-clarkson-chemistry-skip-this-part",
  ownLength: 3.6262166666666666,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-chemistry"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5OniCi8mdZXcJ9nTvIctID",
      externalLink: "https://open.spotify.com/track/5OniCi8mdZXcJ9nTvIctID",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "skip this part",
} as const satisfies Track
