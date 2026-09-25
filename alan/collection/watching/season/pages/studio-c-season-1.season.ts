import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSeason1 = {
  id: "01a06802-b8be-7014-9e96-5b400d2cb554",
  type: "page-type/season",
  slug: "studio-c-season-1",
  title: "Studio C Season 1",
  partOfCollections: ["show/studio-c"],
  position: 1,
  ownLength: 249,
  ownProgress: 249,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2012-10-09",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-80550",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/1",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
