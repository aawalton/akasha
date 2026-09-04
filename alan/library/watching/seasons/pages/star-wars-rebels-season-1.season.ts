import type { Season } from "../season.page-type.ts"

export const starWarsRebelsSeason1 = {
  id: "01a06802-b8bd-702f-86d1-9278b6d7a8e5",
  pageTypeSlug: "season",
  slug: "star-wars-rebels-season-1",
  title: "Star Wars Rebels Season 1",
  partOfSlugs: ["star-wars-rebels"],
  position: 1,
  ownLength: 312,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2014-10-14",
  externalId: "trakt-season-61192",
  externalLink: "https://trakt.tv/shows/star-wars-rebels/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
