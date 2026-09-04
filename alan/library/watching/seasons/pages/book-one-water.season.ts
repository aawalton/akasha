import type { Season } from "../season.page-type.ts"

export const bookOneWater = {
  id: "01a06802-b8b8-7019-99bd-122d30ad6616",
  pageTypeSlug: "season",
  slug: "book-one-water",
  title: "Book One: Water",
  partOfSlugs: ["avatar-the-last-airbender"],
  position: 1,
  ownLength: 487.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2005-02-21",
  externalId: "trakt-season-893",
  externalLink: "https://trakt.tv/shows/avatar-the-last-airbender/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
