import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const numb3rsSeason5 = {
  id: "01a06802-b8bb-7040-b4ea-5cbae930fe9d",
  type: "page-type/season",
  slug: "numb3rs-season-5",
  title: "Numb3rs Season 5",
  partOfCollections: ["show/numb3rs"],
  position: 5,
  ownLength: 982.8,
  ownProgress: 982.8,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2008-10-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-1957",
      externalLink: "https://trakt.tv/shows/numb3rs/seasons/5",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
