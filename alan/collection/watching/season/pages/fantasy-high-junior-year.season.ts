import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const fantasyHighJuniorYear = {
  id: "01a06802-b8b9-7045-bdbc-7ef9514e04a7",
  type: "page-type/season",
  slug: "fantasy-high-junior-year",
  title: "Fantasy High: Junior Year",
  partOfCollections: ["show/dimension-20"],
  position: 21,
  ownLength: 2676,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-01-11",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-335904",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/21",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
