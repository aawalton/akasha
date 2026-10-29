import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theAcolyteSeason1 = {
  id: "01a06802-b8be-7034-b10a-3db98723bdff",
  type: "page-type/season",
  slug: "the-acolyte-season-1",
  title: "The Acolyte Season 1",
  partOfCollections: ["show/the-acolyte"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-06-05",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-285382",
      externalLink: "https://trakt.tv/shows/the-acolyte/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:44:52.906Z",
} as const satisfies Season
