import type { Season } from "../season.page-type.ts"

export const bookThreeFire = {
  id: "01a06802-b8b8-701b-838c-94102338ca4f",
  pageTypeSlug: "season",
  slug: "book-three-fire",
  title: "Book Three: Fire",
  partOfSlugs: ["avatar-the-last-airbender"],
  position: 3,
  ownLength: 511.8,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2007-09-21",
  externalId: "trakt-season-895",
  externalLink: "https://trakt.tv/shows/avatar-the-last-airbender/seasons/3",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
