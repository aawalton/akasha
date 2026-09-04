import type { Season } from "../season.page-type.ts"

export const theMandalorianSeason1 = {
  id: "01a06802-b8bf-7018-bd30-0415580c9e5e",
  pageTypeSlug: "season",
  slug: "the-mandalorian-season-1",
  title: "The Mandalorian Season 1",
  partOfSlugs: ["the-mandalorian"],
  position: 1,
  ownLength: 331.2,
  ownProgress: 331.2,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2019-11-12",
  externalId: "trakt-season-173610",
  externalLink: "https://trakt.tv/shows/the-mandalorian/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
