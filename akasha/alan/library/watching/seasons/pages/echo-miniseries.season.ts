import type { Season } from "../season.page-type.ts"

export const echoMiniseries = {
  id: "01a06802-b8b9-7032-91cb-4e057707851b",
  pageTypeSlug: "season",
  slug: "echo-miniseries",
  title: "Echo Miniseries",
  partOfSlugs: ["echo"],
  position: 1,
  ownLength: 213,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2024-01-10",
  externalId: "trakt-season-255625",
  externalLink: "https://trakt.tv/shows/echo/seasons/1",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
