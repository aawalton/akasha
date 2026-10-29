import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starWarsRebelsSeason1 = {
  id: "01a06802-b8bd-702f-86d1-9278b6d7a8e5",
  type: "page-type/season",
  slug: "star-wars-rebels-season-1",
  title: "Star Wars Rebels Season 1",
  partOfCollections: ["show/star-wars-rebels"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2014-10-14",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-61192",
      externalLink: "https://trakt.tv/shows/star-wars-rebels/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-10-29T15:42:40.123Z",
} as const satisfies Season
