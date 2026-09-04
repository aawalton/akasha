import type { Season } from "../season.page-type.ts"

export const personOfInterestSpecials = {
  id: "01a06802-b8bc-7017-8be4-4d8b81ca3a3d",
  pageTypeSlug: "season",
  slug: "person-of-interest-specials",
  title: "Person of Interest Specials",
  partOfSlugs: ["person-of-interest"],
  position: 0,
  ownLength: 283,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2012-09-05",
  externalId: "0",
  externalLink: "https://trakt.tv/shows/person-of-interest/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
