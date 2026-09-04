import type { Season } from "../season.page-type.ts"

export const starTrekDiscoverySpecials = {
  id: "01a06802-b8bc-7052-911e-5fcdfd99dd70",
  pageTypeSlug: "season",
  slug: "star-trek-discovery-specials",
  title: "Star Trek: Discovery Specials",
  partOfSlugs: ["star-trek-discovery"],
  position: 0,
  ownLength: 871.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2018-03-23",
  externalId: "trakt-season-167671",
  externalLink: "https://trakt.tv/shows/star-trek-discovery/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
