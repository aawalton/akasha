import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeBreakFree = {
  id: "01a0676a-d719-7032-bb88-d988dd2e3813",
  type: "page-type/release",
  slug: "ariana-grande-break-free",
  title: "Break Free",
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  ownLength: 10.536517,
  ownProgress: 10.536517,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-07-02",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4WFgnJrj9Kb67y4NcFBaHo",
      externalLink: "https://open.spotify.com/album/4WFgnJrj9Kb67y4NcFBaHo",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Release
