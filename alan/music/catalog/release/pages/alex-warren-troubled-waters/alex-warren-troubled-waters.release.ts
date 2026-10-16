import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexWarrenTroubledWaters = {
  id: "01a0676a-d72f-701d-8a81-974e9d1b56e6",
  type: "page-type/release",
  slug: "alex-warren-troubled-waters",
  title: "Troubled Waters",
  partOfCollections: ["artist/alex-warren"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2024-09-06",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "54V4i5OLHNmaiXIgK7urCp",
      externalLink: "https://open.spotify.com/album/54V4i5OLHNmaiXIgK7urCp",
      lastSyncedAt: "2026-01-14",
    },
  ],
  createdAt: "2026-09-03T13:17:30.287Z",
  updatedAt: "2026-10-16T14:00:31.585Z",
} as const satisfies Release
