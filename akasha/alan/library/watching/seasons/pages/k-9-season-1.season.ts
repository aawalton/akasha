import type { Season } from "../season.page-type.ts"

export const k9Season1 = {
  id: "01a06802-b8ba-702d-9997-187334236ada",
  pageTypeSlug: "season",
  slug: "k-9-season-1",
  title: "K-9 Season 1",
  partOfSlugs: ["k-9"],
  position: 1,
  ownLength: 702,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2009-10-30",
  externalId: "trakt-season-36963",
  externalLink: "https://trakt.tv/shows/k-9/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
