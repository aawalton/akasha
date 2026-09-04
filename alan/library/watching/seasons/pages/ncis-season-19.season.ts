import type { Season } from "../season.page-type.ts"

export const ncisSeason19 = {
  id: "01a06802-b8bb-702b-af11-e6abe2d92e1e",
  pageTypeSlug: "season",
  slug: "ncis-season-19",
  title: "NCIS Season 19",
  partOfSlugs: ["ncis"],
  position: 19,
  ownLength: 945,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2021-09-21",
  externalId: "trakt-season-263493",
  externalLink: "https://trakt.tv/shows/ncis/seasons/19",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
