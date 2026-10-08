import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const leonardCohenTheFuture = {
  id: "01a0676a-d72d-7013-a850-2059cdf9ea8e",
  type: "page-type/release",
  slug: "leonard-cohen-the-future",
  title: "The Future",
  partOfCollections: ["artist/leonard-cohen"],
  position: 0,
  ownLength: 59.375517,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1992-10-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7E4FRoU4Pk0WuO1SQMV1Bo",
      externalLink: "https://open.spotify.com/album/7E4FRoU4Pk0WuO1SQMV1Bo",
      lastSyncedAt: "2025-10-10",
    },
  ],
  createdAt: "2026-09-03T13:17:30.285Z",
  updatedAt: "2026-09-15T16:37:53.000Z",
} as const satisfies Release
