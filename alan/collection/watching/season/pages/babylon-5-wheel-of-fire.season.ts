import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const babylon5WheelOfFire = {
  id: "01a06802-b8b7-7019-aa1f-1455cbf3f6cf",
  type: "page-type/season",
  slug: "babylon-5-wheel-of-fire",
  title: "Babylon 5 Wheel of Fire",
  partOfCollections: ["show/babylon-5"],
  position: 5,
  ownLength: 990,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1998-01-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "5",
      externalLink: "https://trakt.tv/shows/babylon-5/seasons/5",
      lastSyncedAt: "2025-12-20",
    },
  ],
} as const satisfies Season
