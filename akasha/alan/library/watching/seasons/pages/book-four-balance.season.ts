import type { Season } from "../season.page-type.ts"

export const bookFourBalance = {
  id: "01a06802-b8b8-7017-bf93-20549fd44a85",
  pageTypeSlug: "season",
  slug: "book-four-balance",
  title: "Book Four: Balance",
  partOfSlugs: ["the-legend-of-korra"],
  position: 4,
  ownLength: 298.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2014-10-04",
  externalId: "trakt-season-91246",
  externalLink: "https://trakt.tv/shows/the-legend-of-korra/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
