import type { Season } from "../season.page-type.ts"

export const fantasyHigh = {
  id: "01a06802-b8b9-7044-ad65-48648f25fa91",
  pageTypeSlug: "season",
  slug: "fantasy-high",
  title: "Fantasy High",
  partOfSlugs: ["dimension-20"],
  position: 1,
  ownLength: 1705.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2018-09-19",
  externalId: "trakt-season-174127",
  externalLink: "https://trakt.tv/shows/dimension-20/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
