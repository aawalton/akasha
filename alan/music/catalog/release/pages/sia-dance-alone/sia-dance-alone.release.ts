import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaDanceAlone = {
  id: "01a0676a-d71b-7050-b7fb-6f6c1b80db91",
  type: "page-type/release",
  slug: "sia-dance-alone",
  title: "Dance Alone",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 2.870767,
  ownProgress: 2.870767,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2024-02-07",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6VFvESDvhvsBjCSlIXpIXw",
      externalLink: "https://open.spotify.com/album/6VFvESDvhvsBjCSlIXpIXw",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.267Z",
  updatedAt: "2026-09-15T16:38:50.000Z",
} as const satisfies Release
