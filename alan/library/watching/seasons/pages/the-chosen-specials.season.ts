import type { Season } from "../season.page-type.ts"

export const theChosenSpecials = {
  id: "01a06802-b8bf-7008-976a-04d4ef428905",
  pageTypeSlug: "season",
  slug: "the-chosen-specials",
  title: "The Chosen Specials",
  partOfSlugs: ["the-chosen"],
  position: 0,
  ownLength: 1515,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "archived",
  publishedAt: "2017-12-02",
  externalId: "trakt-season-204072",
  externalLink: "https://trakt.tv/shows/the-chosen/seasons/0",
  lastSyncedAt: "2025-12-19",
} as const satisfies Season
