import type { Season } from "../season.page-type.ts"

export const theSeven = {
  id: "01a06802-b8bf-703c-b9d2-bee9f8c2474e",
  pageTypeSlug: "season",
  slug: "the-seven",
  title: "The Seven",
  partOfSlugs: ["dimension-20"],
  position: 11,
  ownLength: 1440,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2021-08-18",
  externalId: "trakt-season-267049",
  externalLink: "https://trakt.tv/shows/dimension-20/seasons/11",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
