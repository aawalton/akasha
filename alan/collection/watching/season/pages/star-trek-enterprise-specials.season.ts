import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekEnterpriseSpecials = {
  id: "01a06802-b8bd-7002-8320-63edc6a593e4",
  type: "page-type/season",
  slug: "star-trek-enterprise-specials",
  title: "Star Trek: Enterprise Specials",
  partOfCollections: ["show/star-trek-enterprise"],
  position: 0,
  ownLength: 1132.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2013-03-27",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-228126",
      externalLink: "https://trakt.tv/shows/star-trek-enterprise/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
