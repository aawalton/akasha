import type { Season } from "../season.page-type.ts"

export const lastSupper = {
  id: "01a06802-b8ba-702f-9208-6a3891f5bdd1",
  pageTypeSlug: "season",
  slug: "last-supper",
  title: "Last Supper",
  partOfSlugs: ["the-chosen"],
  position: 5,
  ownLength: 463.2,
  ownProgress: 0,
  unitSlug: "minutes",
  status: "not-started",
  publishedAt: "2025-06-15",
  externalId: "trakt-season-431829",
  externalLink: "https://trakt.tv/shows/the-chosen/seasons/5",
  lastSyncedAt: "2025-10-02",
} as const satisfies Season
