import type { Season } from "../season.page-type.ts"

export const starTrekProdigySeason2 = {
  id: "01a06802-b8bd-700e-be97-ea25b5471203",
  pageTypeSlug: "season",
  slug: "star-trek-prodigy-season-2",
  title: "Star Trek: Prodigy Season 2",
  partOfSlugs: ["star-trek-prodigy"],
  position: 2,
  ownLength: 480,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2024-07-01",
  externalLink: "https://trakt.tv/shows/star-trek-prodigy/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
