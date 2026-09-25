import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theXFilesSeason2 = {
  id: "01a06802-b8bf-7054-a88a-89463932a582",
  type: "page-type/season",
  slug: "the-x-files-season-2",
  title: "The X-Files Season 2",
  partOfCollections: ["show/the-x-files-1993-2002"],
  position: 2,
  ownLength: 1143,
  ownProgress: 1143,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1994-09-17",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "2",
      externalLink: "https://trakt.tv/shows/the-x-files/seasons/2",
      lastSyncedAt: "2025-10-22",
    },
  ],
} as const satisfies Season
