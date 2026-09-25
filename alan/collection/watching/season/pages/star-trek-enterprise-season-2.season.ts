import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekEnterpriseSeason2 = {
  id: "01a06802-b8bc-7054-ac8d-fc7c68a364ed",
  type: "page-type/season",
  slug: "star-trek-enterprise-season-2",
  title: "Star Trek: Enterprise Season 2",
  partOfCollections: ["show/star-trek-enterprise"],
  position: 2,
  ownLength: 1117.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2002-09-09",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-enterprise/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
