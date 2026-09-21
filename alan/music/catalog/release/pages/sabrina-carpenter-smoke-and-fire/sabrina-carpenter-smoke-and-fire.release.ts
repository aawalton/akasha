import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const sabrinaCarpenterSmokeAndFire = {
  id: "01a0676a-d729-7033-8886-7e1cf9e02571",
  type: "page-type/release",
  slug: "sabrina-carpenter-smoke-and-fire",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/sabrina-carpenter"],
  position: 0,
  publishedAt: "2016-02-19",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6BNXa8shuN3ANF4P0J2ElP",
      externalLink: "https://open.spotify.com/album/6BNXa8shuN3ANF4P0J2ElP",
      lastSyncedAt: "2025-12-24",
    },
  ],
  title: "Smoke and Fire",
} as const satisfies Release
