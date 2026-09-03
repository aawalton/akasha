import type { Season } from "../season.page-type.ts"

export const starWarsRebelsSpecials = {
  id: "01a06802-b8bd-7033-8381-64e432fb05f1",
  pageTypeSlug: "season",
  slug: "star-wars-rebels-specials",
  title: "Star Wars Rebels Specials",
  partOfSlugs: ["star-wars-rebels"],
  position: 0,
  ownLength: 105,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2014-08-12",
  externalId: "trakt-season-62238",
  externalLink: "https://trakt.tv/shows/star-wars-rebels/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
