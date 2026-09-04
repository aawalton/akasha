import type { Season } from "../season.page-type.ts"

export const starWarsRebelsSeason3 = {
  id: "01a06802-b8bd-7031-8e09-8e67f52b886a",
  pageTypeSlug: "season",
  slug: "star-wars-rebels-season-3",
  title: "Star Wars Rebels Season 3",
  partOfSlugs: ["star-wars-rebels"],
  position: 3,
  ownLength: 523.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2016-09-25",
  externalId: "trakt-season-129837",
  externalLink: "https://trakt.tv/shows/star-wars-rebels/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
