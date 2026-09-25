import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theXFilesSeason5 = {
  id: "01a06802-b8bf-7057-9ec0-a7d251ea418f",
  type: "page-type/season",
  slug: "the-x-files-season-5",
  title: "The X-Files Season 5",
  partOfCollections: ["show/the-x-files-1993-2002"],
  position: 5,
  ownLength: 919,
  ownProgress: 919,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "1997-11-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "5",
      externalLink: "https://trakt.tv/shows/the-x-files/seasons/5",
      lastSyncedAt: "2025-10-22",
    },
  ],
} as const satisfies Season
