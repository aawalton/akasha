import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const zaraLarssonUncover = {
  id: "01a0676a-d72f-7031-b5de-b97eab3f250d",
  type: "page-type/release",
  slug: "zara-larsson-uncover",
  ownLength: 0,
  ownProgress: 0,
  partOfCollections: ["artist/zara-larsson"],
  position: 0,
  publishedAt: "2012-01-01",
  status: "completed",
  unit: "unit/minutes",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "0vXJ3rh6Sy7KWjp2P5d7ll",
      externalLink: "https://open.spotify.com/album/0vXJ3rh6Sy7KWjp2P5d7ll",
      lastSyncedAt: "2025-12-20",
    },
  ],
  title: "Uncover",
  createdAt: "2026-09-03T13:17:30.287Z",
  updatedAt: "2026-09-21T16:45:29.000Z",
} as const satisfies Release
