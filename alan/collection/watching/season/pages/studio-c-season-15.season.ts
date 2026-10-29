import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason15 = {
  id: "01a06802-b8be-701a-9230-2785a6b960fd",
  type: "page-type/season",
  slug: "studio-c-season-15",
  title: "Studio C Season 15",
  partOfCollections: ["show/studio-c"],
  position: 15,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2022-03-15",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-294575",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/15",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T15:44:44.188Z",
} as const satisfies Season
