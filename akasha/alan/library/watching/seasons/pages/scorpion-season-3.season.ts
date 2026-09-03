import type { Season } from "../season.page-type.ts"

export const scorpionSeason3 = {
  id: "01a06802-b8bc-702f-87e4-83c0c08b2f07",
  pageTypeSlug: "season",
  slug: "scorpion-season-3",
  title: "Scorpion Season 3",
  partOfSlugs: ["scorpion"],
  position: 3,
  ownLength: 1444.8,
  ownProgress: 1444.8,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2016-10-04",
  externalId: "trakt-season-128576",
  externalLink: "https://trakt.tv/shows/scorpion/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
