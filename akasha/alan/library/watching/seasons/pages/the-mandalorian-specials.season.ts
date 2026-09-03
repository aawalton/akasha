import type { Season } from "../season.page-type.ts"

export const theMandalorianSpecials = {
  id: "01a06802-b8bf-701b-8be2-3537fe102b84",
  pageTypeSlug: "season",
  slug: "the-mandalorian-specials",
  title: "The Mandalorian Specials",
  partOfSlugs: ["the-mandalorian"],
  position: 0,
  ownLength: 55.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2023-12-12",
  externalId: "trakt-season-355315",
  externalLink: "https://trakt.tv/shows/the-mandalorian/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
