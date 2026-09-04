import type { Season } from "../season.page-type.ts"

export const msMarvelMiniseries = {
  id: "01a06802-b8bb-7006-8332-73af46139622",
  pageTypeSlug: "season",
  slug: "ms-marvel-miniseries",
  title: "Ms. Marvel Miniseries",
  partOfSlugs: ["ms-marvel"],
  position: 1,
  ownLength: 289.2,
  ownProgress: 289.2,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2022-06-08",
  externalId: "trakt-season-240815",
  externalLink: "https://trakt.tv/shows/ms-marvel/seasons/1",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
