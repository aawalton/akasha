import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason8 = {
  id: "01a06802-b8be-7027-ad5c-315c8bb64a2d",
  type: "page-type/season",
  slug: "studio-c-season-8",
  title: "Studio C Season 8",
  partOfCollections: ["show/studio-c"],
  position: 8,
  ownLength: 354,
  ownProgress: 354,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2017-10-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-151263",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/8",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
