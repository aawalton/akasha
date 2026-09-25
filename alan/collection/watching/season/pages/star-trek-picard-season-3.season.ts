import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekPicardSeason3 = {
  id: "01a06802-b8bd-700b-9da3-2fafa89fc728",
  type: "page-type/season",
  slug: "star-trek-picard-season-3",
  title: "Star Trek: Picard Season 3",
  partOfCollections: ["show/star-trek-picard"],
  position: 3,
  ownLength: 537,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2023-02-16",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-picard/seasons/3",
      lastSyncedAt: "2025-10-02",
    },
  ],
} as const satisfies Season
