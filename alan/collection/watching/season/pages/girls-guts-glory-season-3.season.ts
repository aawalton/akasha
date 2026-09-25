import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const girlsGutsGlorySeason3 = {
  id: "01a06802-b8ba-701e-a104-d8179dbc628f",
  type: "page-type/season",
  slug: "girls-guts-glory-season-3",
  title: "Girls Guts Glory Season 3",
  partOfCollections: ["show/girls-guts-glory"],
  position: 3,
  ownLength: 462,
  ownProgress: 462,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-10-01",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-168256",
      externalLink: "https://trakt.tv/shows/girls-guts-glory/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
