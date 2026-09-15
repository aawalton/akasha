import type { Track } from "akasha/alan/music/catalog/track/track.page-type.types.ts"

export const kellyClarksonLighthouseLighthouse = {
  id: "01a0a5ae-cdf8-7173-9b14-98582d9cd74b",
  type: "track",
  slug: "kelly-clarkson-lighthouse-lighthouse",
  ownLength: 3.3508833333333334,
  ownProgress: 0,
  partOfCollections: ["release/kelly-clarkson-lighthouse"],
  position: 1,
  status: "not-started",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4NPYXzJyhR92H5hChEipAb",
      externalLink: "https://open.spotify.com/track/4NPYXzJyhR92H5hChEipAb",
      lastSyncedAt: "2026-09-15",
    },
  ],
  title: "lighthouse",
} as const satisfies Track
