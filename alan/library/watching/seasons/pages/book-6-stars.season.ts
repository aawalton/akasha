import type { Season } from "../season.page-type.ts"

export const book6Stars = {
  id: "01a06802-b8b8-7015-836f-8744649d795c",
  pageTypeSlug: "season",
  slug: "book-6-stars",
  title: "Book 6: Stars",
  partOfSlugs: ["the-dragon-prince"],
  position: 6,
  ownLength: 253.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2024-07-26",
  externalId: "trakt-season-340963",
  externalLink: "https://trakt.tv/shows/the-dragon-prince/seasons/6",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
