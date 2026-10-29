import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason8 = {
  id: "01a06802-b8be-7027-ad5c-315c8bb64a2d",
  type: "page-type/season",
  slug: "studio-c-season-8",
  title: "Studio C Season 8",
  partOfCollections: ["show/studio-c"],
  position: 8,
  ownLength: 0,
  ownProgress: 0,
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
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
  progressedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Season
