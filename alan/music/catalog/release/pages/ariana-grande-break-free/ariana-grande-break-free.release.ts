import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const arianaGrandeBreakFree = {
  id: "01a0676a-d719-7032-bb88-d988dd2e3813",
  type: "page-type/release",
  slug: "ariana-grande-break-free",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/ariana-grande"],
  position: 0,
  publishedAt: "2014-07-02",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4WFgnJrj9Kb67y4NcFBaHo",
      externalLink: "https://open.spotify.com/album/4WFgnJrj9Kb67y4NcFBaHo",
      lastSyncedAt: "2025-10-02",
    },
  ],
  title: "Break Free",
} as const satisfies Release
