import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaPerfect = {
  id: "01a0676a-d726-706d-899f-345a02e1d3c8",
  type: "page-type/release",
  slug: "sia-perfect",
  title: "Perfect",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-03-05",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4EgafMzPEdYTKsNuCiCfFg",
      externalLink: "https://open.spotify.com/album/4EgafMzPEdYTKsNuCiCfFg",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.278Z",
  updatedAt: "2026-10-20T14:01:30.339Z",
  progressedAt: "2026-10-20T14:01:30.339Z",
} as const satisfies Release
