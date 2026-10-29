import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theBigBangTheorySeason10 = {
  id: "01a06802-b8be-7036-aa2c-fb5329f7684e",
  type: "page-type/season",
  slug: "the-big-bang-theory-season-10",
  title: "The Big Bang Theory Season 10",
  partOfCollections: ["show/the-big-bang-theory"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2016-09-20",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-127604",
      externalLink: "https://trakt.tv/shows/the-big-bang-theory/seasons/10",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Season
