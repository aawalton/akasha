import type { Season } from "../season.page-type.types.ts"

export const theMentalistSeason1 = {
  id: "01a06802-b8bf-701c-a80f-a826abf52b08",
  pageTypeSlug: "season",
  type: "season",
  slug: "the-mentalist-season-1",
  title: "The Mentalist Season 1",
  partOfCollections: ["the-mentalist"],
  position: 1,
  ownLength: 999,
  ownProgress: 999,
  unit: "minutes",
  status: "completed",
  publishedAt: "2008-09-24",
  externalId: "1",
  externalLink: "https://trakt.tv/shows/the-mentalist/seasons/1",
  lastSyncedAt: "2026-01-01",
} as const satisfies Season
