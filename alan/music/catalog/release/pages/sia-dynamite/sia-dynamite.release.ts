import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaDynamite = {
  id: "01a0676a-d71c-7045-9ffd-66d72835af66",
  type: "page-type/release",
  slug: "sia-dynamite",
  title: "Dynamite",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2021-10-22",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "50olq3HtK70p3MOSB9hNj8",
      externalLink: "https://open.spotify.com/album/50olq3HtK70p3MOSB9hNj8",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.268Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
