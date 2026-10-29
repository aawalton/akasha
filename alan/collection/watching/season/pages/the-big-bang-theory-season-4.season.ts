import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theBigBangTheorySeason4 = {
  id: "01a06802-b8be-703b-9f03-ce185fb42ce8",
  type: "page-type/season",
  slug: "the-big-bang-theory-season-4",
  title: "The Big Bang Theory Season 4",
  partOfCollections: ["show/the-big-bang-theory"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2010-09-24",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-4083",
      externalLink: "https://trakt.tv/shows/the-big-bang-theory/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Season
