import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const stargateSg1Season4 = {
  id: "01a06802-b8be-7000-9d45-220da06d7a52",
  type: "page-type/season",
  slug: "stargate-sg-1-season-4",
  title: "Stargate SG-1 Season 4",
  partOfCollections: ["show/stargate-sg-1"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2000-07-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-14611",
      externalLink: "https://trakt.tv/shows/stargate-sg-1/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:43:51.281Z",
} as const satisfies Season
