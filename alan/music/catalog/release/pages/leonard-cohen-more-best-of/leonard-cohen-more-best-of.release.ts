import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const leonardCohenMoreBestOf = {
  id: "01a0676a-d725-7001-8206-4aaa4e0192da",
  type: "page-type/release",
  slug: "leonard-cohen-more-best-of",
  title: "More Best Of",
  partOfCollections: ["artist/leonard-cohen"],
  position: 0,
  ownLength: 71.113933,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1997-08-08",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "5Tt73Fi2zEcfDJEPopgEv7",
      externalLink: "https://open.spotify.com/album/5Tt73Fi2zEcfDJEPopgEv7",
      lastSyncedAt: "2025-10-10",
    },
  ],
  createdAt: "2026-09-03T13:17:30.277Z",
  updatedAt: "2026-09-15T16:37:27.000Z",
} as const satisfies Release
