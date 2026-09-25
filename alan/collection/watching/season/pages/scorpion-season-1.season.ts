import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const scorpionSeason1 = {
  id: "01a06802-b8bc-702d-aea2-d0b53bb1dee9",
  type: "page-type/season",
  slug: "scorpion-season-1",
  title: "Scorpion Season 1",
  partOfCollections: ["show/scorpion"],
  position: 1,
  ownLength: 921,
  ownProgress: 921,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2014-09-23",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-61514",
      externalLink: "https://trakt.tv/shows/scorpion/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
