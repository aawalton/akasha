import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theBigBangTheorySeason11 = {
  id: "01a06802-b8be-7037-887a-787d3c59c713",
  type: "page-type/season",
  slug: "the-big-bang-theory-season-11",
  title: "The Big Bang Theory Season 11",
  partOfCollections: ["show/the-big-bang-theory"],
  position: 11,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-09-26",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-142214",
      externalLink: "https://trakt.tv/shows/the-big-bang-theory/seasons/11",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:45:16.285Z",
} as const satisfies Season
