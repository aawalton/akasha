import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekEnterpriseSeason1 = {
  id: "01a06802-b8bc-7053-9962-354264b894fc",
  type: "page-type/season",
  slug: "star-trek-enterprise-season-1",
  title: "Star Trek: Enterprise Season 1",
  partOfCollections: ["show/star-trek-enterprise"],
  position: 1,
  ownLength: 1144.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2001-09-27",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-enterprise/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
