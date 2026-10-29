import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekProdigySeason2 = {
  id: "01a06802-b8bd-700e-be97-ea25b5471203",
  type: "page-type/season",
  slug: "star-trek-prodigy-season-2",
  title: "Star Trek: Prodigy Season 2",
  partOfCollections: ["show/star-trek-prodigy"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-07-01",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-prodigy/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Season
