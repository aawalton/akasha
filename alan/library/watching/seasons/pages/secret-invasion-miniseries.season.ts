import type { Season } from "../season.page-type.ts"

export const secretInvasionMiniseries = {
  id: "01a06802-b8bc-7032-99b1-1b1d5f77f576",
  pageTypeSlug: "season",
  slug: "secret-invasion-miniseries",
  title: "Secret Invasion Miniseries",
  partOfSlugs: ["secret-invasion"],
  position: 1,
  ownLength: 262.2,
  ownProgress: 262.2,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2023-06-21",
  externalId: "trakt-season-249156",
  externalLink: "https://trakt.tv/shows/secret-invasion/seasons/1",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
