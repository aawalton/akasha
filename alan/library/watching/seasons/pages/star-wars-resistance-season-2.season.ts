import type { Season } from "../season.page-type.ts"

export const starWarsResistanceSeason2 = {
  id: "01a06802-b8bd-7035-91ee-ba59975b0143",
  pageTypeSlug: "season",
  slug: "star-wars-resistance-season-2",
  title: "Star Wars Resistance Season 2",
  partOfSlugs: ["star-wars-resistance"],
  position: 2,
  ownLength: 483,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2019-10-07",
  externalId: "trakt-season-196921",
  externalLink: "https://trakt.tv/shows/star-wars-resistance/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
