import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const fantasyHighSophomoreYear = {
  id: "01a06802-b8b9-7046-8e93-d091584d2c0b",
  type: "page-type/season",
  slug: "fantasy-high-sophomore-year",
  title: "Fantasy High: Sophomore Year",
  partOfCollections: ["show/dimension-20"],
  position: 7,
  ownLength: 3124.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2019-10-16",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-233897",
      externalLink: "https://trakt.tv/shows/dimension-20/seasons/7",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
