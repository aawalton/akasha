import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const blackMirrorSeason4 = {
  id: "01a06802-b8b8-7006-a32d-f6a0c4e6866c",
  type: "page-type/season",
  slug: "black-mirror-season-4",
  title: "Black Mirror Season 4",
  partOfCollections: ["show/black-mirror"],
  position: 4,
  ownLength: 349.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-12-29",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-139676",
      externalLink: "https://trakt.tv/shows/black-mirror/seasons/4",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
