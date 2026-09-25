import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason7 = {
  id: "01a06802-b8be-7026-9e5a-f10415838b65",
  type: "page-type/season",
  slug: "studio-c-season-7",
  title: "Studio C Season 7",
  partOfCollections: ["show/studio-c"],
  position: 7,
  ownLength: 463.8,
  ownProgress: 463.8,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2016-10-02",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-132293",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/7",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
