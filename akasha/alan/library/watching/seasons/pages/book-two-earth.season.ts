import type { Season } from "../season.page-type.ts"

export const bookTwoEarth = {
  id: "01a06802-b8b8-701c-9659-f13a7af6c291",
  pageTypeSlug: "season",
  slug: "book-two-earth",
  title: "Book Two: Earth",
  partOfSlugs: ["avatar-the-last-airbender"],
  position: 2,
  ownLength: 496.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2006-03-17",
  externalId: "trakt-season-894",
  externalLink: "https://trakt.tv/shows/avatar-the-last-airbender/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
