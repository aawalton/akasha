import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaUnstoppable = {
  id: "01a0676a-d72f-7049-8659-64ede34cf822",
  type: "page-type/release",
  slug: "sia-unstoppable",
  title: "Unstoppable",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-01-21",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1o1ElG9Z0MKQ7IDHhua1fK",
      externalLink: "https://open.spotify.com/album/1o1ElG9Z0MKQ7IDHhua1fK",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.287Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
