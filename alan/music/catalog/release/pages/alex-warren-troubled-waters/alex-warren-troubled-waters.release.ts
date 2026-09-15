import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const alexWarrenTroubledWaters = {
  id: "01a0676a-d72f-701d-8a81-974e9d1b56e6",
  type: "page-type/release",
  slug: "alex-warren-troubled-waters",
  title: "Troubled Waters",
  partOfCollections: ["artist/alex-warren"],
  position: 0,
  ownLength: 3.29625,
  ownProgress: 3.29625,
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
} as const satisfies Release
