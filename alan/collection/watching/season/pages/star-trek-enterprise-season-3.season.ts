import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekEnterpriseSeason3 = {
  id: "01a06802-b8bd-7000-be90-45719b847393",
  type: "page-type/season",
  slug: "star-trek-enterprise-season-3",
  title: "Star Trek: Enterprise Season 3",
  partOfCollections: ["show/star-trek-enterprise"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2003-09-11",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-enterprise/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-10-29T15:41:32.079Z",
} as const satisfies Season
