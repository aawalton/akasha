import type { Season } from "../season.page-type.ts"

export const ahsokaSeason1 = {
  id: "01a06802-b8b7-700d-b48f-147e9bff9546",
  pageTypeSlug: "season",
  slug: "ahsoka-season-1",
  title: "Ahsoka Season 1",
  partOfSlugs: ["ahsoka"],
  position: 1,
  ownLength: 375,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2023-08-23",
  externalId: "trakt-season-236209",
  externalLink: "https://trakt.tv/shows/ahsoka/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
