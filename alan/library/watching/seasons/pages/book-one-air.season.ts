import type { Season } from "../season.page-type.ts"

export const bookOneAir = {
  id: "01a06802-b8b8-7018-8b90-27d49f6a2288",
  pageTypeSlug: "season",
  slug: "book-one-air",
  title: "Book One: Air",
  partOfSlugs: ["the-legend-of-korra"],
  position: 1,
  ownLength: 276,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2012-04-15",
  externalId: "trakt-season-45516",
  externalLink: "https://trakt.tv/shows/the-legend-of-korra/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
