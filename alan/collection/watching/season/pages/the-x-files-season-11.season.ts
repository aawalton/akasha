import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theXFilesSeason11 = {
  id: "01a06802-b8bf-7053-ad52-5c5e3b55605c",
  type: "page-type/season",
  slug: "the-x-files-season-11",
  title: "The X-Files Season 11",
  partOfCollections: ["show/the-x-files-1993-2002"],
  position: 11,
  ownLength: 439,
  ownProgress: 439,
  unit: "unit/minutes",
  status: "in-progress",
  publishedAt: "2018-01-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "11",
      externalLink: "https://trakt.tv/shows/the-x-files/seasons/11",
      lastSyncedAt: "2025-10-22",
    },
  ],
} as const satisfies Season
