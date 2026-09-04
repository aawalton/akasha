import type { Season } from "../season.page-type.ts"

export const moonKnightMiniseries = {
  id: "01a06802-b8bb-7005-b0fe-0156ab9ca107",
  pageTypeSlug: "season",
  slug: "moon-knight-miniseries",
  title: "Moon Knight Miniseries",
  partOfSlugs: ["moon-knight"],
  position: 1,
  ownLength: 301.8,
  ownProgress: 301.8,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2022-03-30",
  externalId: "trakt-season-240814",
  externalLink: "https://trakt.tv/shows/moon-knight/seasons/1",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
