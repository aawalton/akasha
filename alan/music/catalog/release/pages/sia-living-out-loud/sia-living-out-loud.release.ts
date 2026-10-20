import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaLivingOutLoud = {
  id: "01a0676a-d723-7058-ad66-fcd8dfc67386",
  type: "page-type/release",
  slug: "sia-living-out-loud",
  title: "Living Out Loud",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-02-03",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0t7EBnbzVx0Ekhi6PHsyrh",
      externalLink: "https://open.spotify.com/album/0t7EBnbzVx0Ekhi6PHsyrh",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.275Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
