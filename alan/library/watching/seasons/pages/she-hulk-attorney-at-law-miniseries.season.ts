import type { Season } from "../season.page-type.ts"

export const sheHulkAttorneyAtLawMiniseries = {
  id: "01a06802-b8bc-7038-89f3-4775d5622458",
  pageTypeSlug: "season",
  slug: "she-hulk-attorney-at-law-miniseries",
  title: "She-Hulk: Attorney at Law Miniseries",
  partOfSlugs: ["she-hulk-attorney-at-law"],
  position: 1,
  ownLength: 309,
  ownProgress: 309,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2022-08-18",
  externalId: "trakt-season-240816",
  externalLink: "https://trakt.tv/shows/she-hulk-attorney-at-law/seasons/1",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
