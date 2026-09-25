import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const girlsGutsGlorySeason1 = {
  id: "01a06802-b8ba-701c-bfa9-d4613b93046f",
  type: "page-type/season",
  slug: "girls-guts-glory-season-1",
  title: "Girls Guts Glory Season 1",
  partOfCollections: ["show/girls-guts-glory"],
  position: 1,
  ownLength: 462,
  ownProgress: 462,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-05-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-168247",
      externalLink: "https://trakt.tv/shows/girls-guts-glory/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
