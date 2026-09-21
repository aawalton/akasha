import type { Release } from "akasha/alan/music/catalog/release/release.page-type.types.ts"

export const greenDayKnowYourEnemy = {
  id: "01a0676a-d722-704b-853a-eb094bfcfddc",
  type: "page-type/release",
  slug: "green-day-know-your-enemy",
  title: "Know Your Enemy",
  partOfCollections: ["artist/green-day"],
  position: 0,
  ownLength: 8.11575,
  ownProgress: 8.11575,
  unit: "unit/minutes",
  status: "completed",
  grade: "C",
  publishedAt: "2009-05-01",
  externalIdentity: [
    {
      source: "spotify",
      externalId: "4ttPHS7Bi0GXnry9C9yClz",
      externalLink: "https://open.spotify.com/album/4ttPHS7Bi0GXnry9C9yClz",
      lastSyncedAt: "2025-10-04",
    },
  ],
} as const satisfies Release
