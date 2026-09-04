import type { Season } from "../season.page-type.ts"

export const theMandalorianSeason3 = {
  id: "01a06802-b8bf-701a-bf3f-46db5610611a",
  pageTypeSlug: "season",
  slug: "the-mandalorian-season-3",
  title: "The Mandalorian Season 3",
  partOfSlugs: ["the-mandalorian"],
  position: 3,
  ownLength: 349.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-03-01",
  externalId: "trakt-season-303219",
  externalLink: "https://trakt.tv/shows/the-mandalorian/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
