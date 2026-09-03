import type { Season } from "../season.page-type.ts"

export const helstromSeason1 = {
  id: "01a06802-b8ba-7024-97ef-91cc867b1158",
  pageTypeSlug: "season",
  slug: "helstrom-season-1",
  title: "Helstrom Season 1",
  partOfSlugs: ["helstrom"],
  position: 1,
  ownLength: 516,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-10-16",
  externalId: "trakt-season-196072",
  externalLink: "https://trakt.tv/shows/helstrom/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
