import type { Season } from "../season.page-type.ts"

export const book2Sky = {
  id: "01a06802-b8b8-7011-b4cb-b0625bf3b5f3",
  pageTypeSlug: "season",
  slug: "book-2-sky",
  title: "Book 2: Sky",
  partOfSlugs: ["the-dragon-prince"],
  position: 2,
  ownLength: 241.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2019-02-15",
  externalId: "trakt-season-173441",
  externalLink: "https://trakt.tv/shows/the-dragon-prince/seasons/2",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
