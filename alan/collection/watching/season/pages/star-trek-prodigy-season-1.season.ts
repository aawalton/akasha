import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekProdigySeason1 = {
  id: "01a06802-b8bd-700d-97f1-6d0ee5df1bce",
  type: "page-type/season",
  slug: "star-trek-prodigy-season-1",
  title: "Star Trek: Prodigy Season 1",
  partOfCollections: ["show/star-trek-prodigy"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-10-28",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-prodigy/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-10-29T15:41:50.343Z",
} as const satisfies Season
