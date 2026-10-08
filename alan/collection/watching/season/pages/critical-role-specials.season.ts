import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const criticalRoleSpecials = {
  id: "01a06802-b8b8-7044-9542-b372c39f0980",
  type: "page-type/season",
  slug: "critical-role-specials",
  title: "Critical Role Specials",
  partOfCollections: ["show/critical-role"],
  position: 0,
  ownLength: 24866.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2014-09-16",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-114153",
      externalLink: "https://trakt.tv/shows/critical-role/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
