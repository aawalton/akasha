import type { Season } from "../season.page-type.ts"

export const starWarsRebelsSeason2 = {
  id: "01a06802-b8bd-7030-9449-1fd3a5832c1c",
  pageTypeSlug: "season",
  slug: "star-wars-rebels-season-2",
  title: "Star Wars Rebels Season 2",
  partOfSlugs: ["star-wars-rebels"],
  position: 2,
  ownLength: 475.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2015-10-15",
  externalId: "trakt-season-103107",
  externalLink: "https://trakt.tv/shows/star-wars-rebels/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
