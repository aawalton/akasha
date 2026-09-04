import type { Season } from "../season.page-type.ts"

export const ironheartMiniseries = {
  id: "01a06802-b8ba-702b-a53a-6f387cc03634",
  pageTypeSlug: "season",
  slug: "ironheart-miniseries",
  title: "Ironheart Miniseries",
  partOfSlugs: ["ironheart"],
  position: 1,
  ownLength: 304.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2025-06-25",
  externalId: "trakt-season-236213",
  externalLink: "https://trakt.tv/shows/ironheart/seasons/1",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
