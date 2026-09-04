import type { Season } from "../season.page-type.ts"

export const starWarsResistanceSpecials = {
  id: "01a06802-b8bd-7036-a320-d85ef8fac906",
  pageTypeSlug: "season",
  slug: "star-wars-resistance-specials",
  title: "Star Wars Resistance Specials",
  partOfSlugs: ["star-wars-resistance"],
  position: 0,
  ownLength: 16.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2018-12-11",
  externalId: "trakt-season-177642",
  externalLink: "https://trakt.tv/shows/star-wars-resistance/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
