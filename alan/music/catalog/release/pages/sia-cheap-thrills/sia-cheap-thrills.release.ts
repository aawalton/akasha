import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaCheapThrills = {
  id: "01a0676a-d71a-7022-b971-a591c58d5e09",
  type: "page-type/release",
  slug: "sia-cheap-thrills",
  title: "Cheap Thrills",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2015-12-17",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1ZMYMTP0S4hp9AlGkAWWjt",
      externalLink: "https://open.spotify.com/album/1ZMYMTP0S4hp9AlGkAWWjt",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.266Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
