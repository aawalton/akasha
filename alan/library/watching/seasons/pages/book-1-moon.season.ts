import type { Season } from "../season.page-type.ts"

export const book1Moon = {
  id: "01a06802-b8b8-7010-82ce-d03925f8e2e7",
  pageTypeSlug: "season",
  slug: "book-1-moon",
  title: "Book 1: Moon",
  partOfSlugs: ["the-dragon-prince"],
  position: 1,
  ownLength: 235.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2018-09-14",
  externalId: "trakt-season-168449",
  externalLink: "https://trakt.tv/shows/the-dragon-prince/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
