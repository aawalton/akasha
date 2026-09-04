import type { Season } from "../season.page-type.ts"

export const theBookOfBobaFettMiniseries = {
  id: "01a06802-b8bf-7003-8b63-6f2b290bb08c",
  pageTypeSlug: "season",
  slug: "the-book-of-boba-fett-miniseries",
  title: "The Book of Boba Fett Miniseries",
  partOfSlugs: ["the-book-of-boba-fett"],
  position: 1,
  ownLength: 346.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2021-12-29",
  externalId: "trakt-season-237250",
  externalLink: "https://trakt.tv/shows/the-book-of-boba-fett/seasons/1",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
