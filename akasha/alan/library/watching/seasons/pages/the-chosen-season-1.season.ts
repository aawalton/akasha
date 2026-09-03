import type { Season } from "../season.page-type.ts"

export const theChosenSeason1 = {
  id: "01a06802-b8bf-7004-a298-c059895c0c17",
  pageTypeSlug: "season",
  slug: "the-chosen-season-1",
  title: "The Chosen Season 1",
  partOfSlugs: ["the-chosen"],
  position: 1,
  ownLength: 364.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2019-04-21",
  externalId: "trakt-season-204073",
  externalLink: "https://trakt.tv/shows/the-chosen/seasons/1",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
