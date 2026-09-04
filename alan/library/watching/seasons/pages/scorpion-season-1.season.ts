import type { Season } from "../season.page-type.ts"

export const scorpionSeason1 = {
  id: "01a06802-b8bc-702d-aea2-d0b53bb1dee9",
  pageTypeSlug: "season",
  slug: "scorpion-season-1",
  title: "Scorpion Season 1",
  partOfSlugs: ["scorpion"],
  position: 1,
  ownLength: 921,
  ownProgress: 921,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2014-09-23",
  externalId: "trakt-season-61514",
  externalLink: "https://trakt.tv/shows/scorpion/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
