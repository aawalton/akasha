import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSeason19 = {
  id: "01a06802-b8bb-702b-af11-e6abe2d92e1e",
  type: "page-type/season",
  slug: "ncis-season-19",
  title: "NCIS Season 19",
  partOfCollections: ["show/ncis"],
  position: 19,
  ownLength: 945,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2021-09-21",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-263493",
      externalLink: "https://trakt.tv/shows/ncis/seasons/19",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
