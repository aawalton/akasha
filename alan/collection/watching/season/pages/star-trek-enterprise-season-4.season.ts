import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekEnterpriseSeason4 = {
  id: "01a06802-b8bd-7001-b34a-f2cb0a436ad4",
  type: "page-type/season",
  slug: "star-trek-enterprise-season-4",
  title: "Star Trek: Enterprise Season 4",
  partOfCollections: ["show/star-trek-enterprise"],
  position: 4,
  ownLength: 946.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2004-10-09",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-enterprise/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
