import type { Season } from "../season.page-type.ts"

export const downtonAbbeySeason1 = {
  id: "01a06802-b8b9-7028-896b-a0d5b75a9d4e",
  pageTypeSlug: "season",
  slug: "downton-abbey-season-1",
  title: "Downton Abbey Season 1",
  partOfSlugs: ["downton-abbey"],
  position: 1,
  ownLength: 379.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2010-09-26",
  externalId: "trakt-season-45534",
  externalLink: "https://trakt.tv/shows/downton-abbey/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
