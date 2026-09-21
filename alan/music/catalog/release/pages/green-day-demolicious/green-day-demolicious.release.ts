import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayDemolicious = {
  id: "01a0676a-d71c-7008-b257-aa41ae2e9c68",
  type: "page-type/release",
  slug: "green-day-demolicious",
  title: "Demolicious",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 62.799933,
  ownProgress: 62.799933,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2014-04-19",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "7prfPBMbgDyhq7kdpM0R9v",
      externalLink: "https://open.spotify.com/album/7prfPBMbgDyhq7kdpM0R9v",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
