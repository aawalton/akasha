import type { Season } from "../season.page-type.ts"

export const scorpionSeason2 = {
  id: "01a06802-b8bc-702e-804a-bec268efb7a7",
  pageTypeSlug: "season",
  slug: "scorpion-season-2",
  title: "Scorpion Season 2",
  partOfSlugs: ["scorpion"],
  position: 2,
  ownLength: 1464,
  ownProgress: 1464,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2015-09-22",
  externalId: "trakt-season-112178",
  externalLink: "https://trakt.tv/shows/scorpion/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
