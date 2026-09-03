import type { Season } from "../season.page-type.ts"

export const starTrekEnterpriseSpecials = {
  id: "01a06802-b8bd-7002-8320-63edc6a593e4",
  pageTypeSlug: "season",
  slug: "star-trek-enterprise-specials",
  title: "Star Trek: Enterprise Specials",
  partOfSlugs: ["star-trek-enterprise"],
  position: 0,
  ownLength: 1132.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2013-03-27",
  externalId: "trakt-season-228126",
  externalLink: "https://trakt.tv/shows/star-trek-enterprise/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
