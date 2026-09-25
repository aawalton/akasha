import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const burrowSEnd = {
  id: "01a06802-b8b8-701e-9392-1317715975c5",
  type: "page-type/season",
  slug: "burrow-s-end",
  title: "Burrow's End",
  partOfCollections: ["show/dimension-20"],
  position: 20,
  ownLength: 1198.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-10-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-334388",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/20",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
