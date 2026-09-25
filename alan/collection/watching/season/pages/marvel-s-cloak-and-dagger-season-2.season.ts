import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const marvelSCloakAndDaggerSeason2 = {
  id: "01a06802-b8ba-7041-9bcc-c4a90796d4d4",
  type: "page-type/season",
  slug: "marvel-s-cloak-and-dagger-season-2",
  title: "Marvel's Cloak & Dagger Season 2",
  partOfCollections: ["show/cloak-and-dagger"],
  position: 2,
  ownLength: 409.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-04-05",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-173894",
      externalLink: "https://trakt.tv/shows/marvel-s-cloak-dagger/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
