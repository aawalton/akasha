import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSCloakAndDaggerSeason1 = {
  id: "01a06802-b8ba-7040-bb1b-301c90d9d5cd",
  type: "page-type/season",
  slug: "marvel-s-cloak-and-dagger-season-1",
  title: "Marvel's Cloak & Dagger Season 1",
  partOfCollections: ["show/cloak-and-dagger"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2018-06-08",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-157728",
      externalLink: "https://trakt.tv/shows/marvel-s-cloak-dagger/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.962Z",
  updatedAt: "2026-10-29T15:25:33.220Z",
} as const satisfies Season
