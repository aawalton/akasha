import type { Season } from "../season.page-type.ts"

export const wandavisionMiniseries = {
  id: "01a06802-b8c0-700e-8795-1203a9379c7d",
  pageTypeSlug: "season",
  slug: "wandavision-miniseries",
  title: "WandaVision Miniseries",
  partOfSlugs: ["wandavision"],
  position: 1,
  ownLength: 363,
  ownProgress: 363,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2021-01-15",
  externalId: "trakt-season-233908",
  externalLink: "https://trakt.tv/shows/wandavision/seasons/1",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
