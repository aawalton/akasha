import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonChristmastryBlessed = {
  id: "01a0a5ae-cf44-79c7-81a4-dd402a0a6fed",
  type: "track",
  slug: "kelly-clarkson-christmastry-blessed",
  ownLength: 3.5776833333333333,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-christmastry"],
  position: 5,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4kwwE9zCAKkiUPo3YC1Yh1",
      externalLink: "https://open.spotify.com/track/4kwwE9zCAKkiUPo3YC1Yh1",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "Blessed",
} as const satisfies Track
