import type { Season } from "../season.page-type.ts"

export const book3Sun = {
  id: "01a06802-b8b8-7012-bf49-93df5cf5645c",
  pageTypeSlug: "season",
  slug: "book-3-sun",
  title: "Book 3: Sun",
  partOfSlugs: ["the-dragon-prince"],
  position: 3,
  ownLength: 249,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2019-11-22",
  externalId: "trakt-season-201542",
  externalLink: "https://trakt.tv/shows/the-dragon-prince/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
