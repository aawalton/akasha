import type { Season } from "../season.page-type.ts"

export const manifestSeason3 = {
  id: "01a06802-b8ba-7034-b1b3-11982cadcec7",
  pageTypeSlug: "season",
  slug: "manifest-season-3",
  title: "Manifest Season 3",
  partOfSlugs: ["manifest"],
  position: 3,
  ownLength: 559,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2021-04-01",
  externalId: "3",
  externalLink: "https://trakt.tv/shows/manifest/seasons/3",
  lastSyncedAt: "2026-01-01",
} as const satisfies Season
