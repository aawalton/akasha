import type { Season } from "../season.page-type.ts"

export const hawkeyeMiniseries = {
  id: "01a06802-b8ba-7023-ad8c-2bc62d512325",
  pageTypeSlug: "season",
  slug: "hawkeye-miniseries",
  title: "Hawkeye Miniseries",
  partOfSlugs: ["hawkeye"],
  position: 1,
  ownLength: 297,
  ownProgress: 297,
  unitSlug: "minutes",
  status: "completed",
  publishedAt: "2021-11-24",
  externalId: "trakt-season-239912",
  externalLink: "https://trakt.tv/shows/hawkeye-2021/seasons/1",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
