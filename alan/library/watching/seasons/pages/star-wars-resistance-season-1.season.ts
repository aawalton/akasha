import type { Season } from "../season.page-type.ts"

export const starWarsResistanceSeason1 = {
  id: "01a06802-b8bd-7034-b518-f5f86289f748",
  pageTypeSlug: "season",
  slug: "star-wars-resistance-season-1",
  title: "Star Wars Resistance Season 1",
  partOfSlugs: ["star-wars-resistance"],
  position: 1,
  ownLength: 511.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2018-10-08",
  externalId: "trakt-season-169872",
  externalLink: "https://trakt.tv/shows/star-wars-resistance/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
