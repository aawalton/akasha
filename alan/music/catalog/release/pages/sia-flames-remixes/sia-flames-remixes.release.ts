import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const siaFlamesRemixes = {
  id: "01a0676a-d71e-700e-94f4-bd97df1cfc16",
  type: "page-type/release",
  slug: "sia-flames-remixes",
  title: "Flames (Remixes)",
  partOfCollections: ["artist/sia"],
  position: 0,
  ownLength: 9.234833333333333,
  ownProgress: 9.234833,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2018-05-11",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "1hsAAWhVWdVzK3FeIZQVUW",
      externalLink: "https://open.spotify.com/album/1hsAAWhVWdVzK3FeIZQVUW",
      lastSyncedAt: "2025-11-27",
    },
  ],
  createdAt: "2026-09-03T13:17:30.270Z",
  updatedAt: "2026-10-20T13:51:09.878Z",
} as const satisfies Release
