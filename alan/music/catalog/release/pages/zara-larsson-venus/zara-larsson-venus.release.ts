import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonVenus = {
  id: "01a0676a-d730-7002-add3-dc7d06f18191",
  type: "page-type/release",
  slug: "zara-larsson-venus",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2024-02-09",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0qqZ6HD72So93exL9rH7zi",
      externalLink: "https://open.spotify.com/album/0qqZ6HD72So93exL9rH7zi",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "VENUS",
  createdAt: "2026-09-03T13:17:30.288Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
