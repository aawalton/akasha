import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starWarsAndorSeason2 = {
  id: "01a06802-b8bd-7029-9c4e-a6a7e3eda6a6",
  type: "page-type/season",
  slug: "star-wars-andor-season-2",
  title: "Star Wars: Andor Season 2",
  partOfCollections: ["show/andor"],
  position: 2,
  ownLength: 630,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-04-23",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-426409",
      externalLink: "https://trakt.tv/shows/star-wars-andor/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
