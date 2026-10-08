import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaSnowman = {
  id: "01a0676a-d729-703e-8248-6198651995df",
  type: "page-type/release",
  slug: "sia-snowman",
  title: "Snowman",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 5.762,
  ownProgress: 5.762,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2025-11-14",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "6ABuOE8UhKiIiG0nK0fyUb",
      externalLink: "https://open.spotify.com/album/6ABuOE8UhKiIiG0nK0fyUb",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.281Z",
  updatedAt: "2026-09-15T16:39:19.000Z",
} as const satisfies Release
