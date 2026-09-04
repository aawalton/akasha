import type { Season } from "../season.page-type.ts"

export const bookTwoSpirits = {
  id: "01a06802-b8b8-701d-8e34-5697eb745b89",
  pageTypeSlug: "season",
  slug: "book-two-spirits",
  title: "Book Two: Spirits",
  partOfSlugs: ["the-legend-of-korra"],
  position: 2,
  ownLength: 322.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2013-09-14",
  externalId: "trakt-season-45517",
  externalLink: "https://trakt.tv/shows/the-legend-of-korra/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
