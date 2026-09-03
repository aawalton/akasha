import type { Season } from "../season.page-type.ts"

export const book5Ocean = {
  id: "01a06802-b8b8-7014-b398-ac5159b19914",
  pageTypeSlug: "season",
  slug: "book-5-ocean",
  title: "Book 5: Ocean",
  partOfSlugs: ["the-dragon-prince"],
  position: 5,
  ownLength: 252,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-07-22",
  externalId: "trakt-season-327596",
  externalLink: "https://trakt.tv/shows/the-dragon-prince/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
