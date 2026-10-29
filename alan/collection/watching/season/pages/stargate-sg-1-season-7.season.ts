import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const stargateSg1Season7 = {
  id: "01a06802-b8be-7003-8723-d0d2bf6a38ef",
  type: "page-type/season",
  slug: "stargate-sg-1-season-7",
  title: "Stargate SG-1 Season 7",
  partOfCollections: ["show/stargate-sg-1"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2003-06-14",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-14614",
      externalLink: "https://trakt.tv/shows/stargate-sg-1/seasons/7",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:43:51.281Z",
} as const satisfies Season
