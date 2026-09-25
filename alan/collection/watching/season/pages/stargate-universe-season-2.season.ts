import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const stargateUniverseSeason2 = {
  id: "01a06802-b8be-7008-9afc-f1cd9dbba2bf",
  type: "page-type/season",
  slug: "stargate-universe-season-2",
  title: "Stargate Universe Season 2",
  partOfCollections: ["show/stargate-universe"],
  position: 2,
  ownLength: 871.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2010-09-29",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-15505",
      externalLink: "https://trakt.tv/shows/stargate-universe/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
