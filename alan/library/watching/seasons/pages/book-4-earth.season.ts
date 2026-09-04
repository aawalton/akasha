import type { Season } from "../season.page-type.ts"

export const book4Earth = {
  id: "01a06802-b8b8-7013-9302-c231363be0cb",
  pageTypeSlug: "season",
  slug: "book-4-earth",
  title: "Book 4: Earth",
  partOfSlugs: ["the-dragon-prince"],
  position: 4,
  ownLength: 253.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2022-11-03",
  externalId: "trakt-season-303508",
  externalLink: "https://trakt.tv/shows/the-dragon-prince/seasons/4",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
