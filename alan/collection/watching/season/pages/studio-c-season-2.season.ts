import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason2 = {
  id: "01a06802-b8be-701f-bc7c-89e2e877f2d1",
  type: "page-type/season",
  slug: "studio-c-season-2",
  title: "Studio C Season 2",
  partOfCollections: ["show/studio-c"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2013-04-02",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-80648",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-10-29T16:36:20.344Z",
  progressedAt: "2026-10-29T16:36:20.344Z",
} as const satisfies Season
