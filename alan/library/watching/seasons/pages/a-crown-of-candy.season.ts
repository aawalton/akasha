import type { Season } from "../season.page-type.ts"

export const aCrownOfCandy = {
  id: "01a06802-b8b7-7008-9d4c-05281b5b09fd",
  pageTypeSlug: "season",
  slug: "a-crown-of-candy",
  title: "A Crown of Candy",
  partOfSlugs: ["dimension-20"],
  position: 5,
  ownLength: 2185.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2020-04-08",
  externalId: "trakt-season-215669",
  externalLink: "https://trakt.tv/shows/dimension-20/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
