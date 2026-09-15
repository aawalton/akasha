import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterSmokeAndFire = {
  id: "01a0676a-d729-7033-8886-7e1cf9e02571",
  type: "page-type/release",
  slug: "sabrina-carpenter-smoke-and-fire",
  title: "Smoke and Fire",
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  ownLength: 3.750167,
  ownProgress: 3.750167,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-02-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6BNXa8shuN3ANF4P0J2ElP",
      externalLink: "https://open.spotify.com/album/6BNXa8shuN3ANF4P0J2ElP",
      lastSyncedAt: "2025-12-24",
    },
  ],
} as const satisfies Release
