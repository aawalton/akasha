import type { Season } from "../season.page-type.ts"

export const starWarsRebelsSeason4 = {
  id: "01a06802-b8bd-7032-a728-a788edc2be3e",
  pageTypeSlug: "season",
  slug: "star-wars-rebels-season-4",
  title: "Star Wars Rebels Season 4",
  partOfSlugs: ["star-wars-rebels"],
  position: 4,
  ownLength: 384,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2017-10-17",
  externalId: "trakt-season-150192",
  externalLink: "https://trakt.tv/shows/star-wars-rebels/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
