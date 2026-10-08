import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaButtons = {
  id: "01a0676a-d719-7049-aa8a-9bffae702d26",
  type: "page-type/release",
  slug: "sia-buttons",
  title: "Buttons",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 36.37485,
  ownProgress: 36.37485,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2008-01-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7fosq6V3NqDCnwU5f3Wu4S",
      externalLink: "https://open.spotify.com/album/7fosq6V3NqDCnwU5f3Wu4S",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.265Z",
  updatedAt: "2026-09-15T16:38:50.000Z",
} as const satisfies Release
