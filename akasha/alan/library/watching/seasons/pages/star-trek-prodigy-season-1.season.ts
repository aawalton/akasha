import type { Season } from "../season.page-type.ts"

export const starTrekProdigySeason1 = {
  id: "01a06802-b8bd-700d-97f1-6d0ee5df1bce",
  pageTypeSlug: "season",
  slug: "star-trek-prodigy-season-1",
  title: "Star Trek: Prodigy Season 1",
  partOfSlugs: ["star-trek-prodigy"],
  position: 1,
  ownLength: 475.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2021-10-28",
  externalLink: "https://trakt.tv/shows/star-trek-prodigy/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
