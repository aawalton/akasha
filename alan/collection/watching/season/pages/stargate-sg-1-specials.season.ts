import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const stargateSg1Specials = {
  id: "01a06802-b8be-7006-9fad-7ae1ae4ae053",
  type: "page-type/season",
  slug: "stargate-sg-1-specials",
  title: "Stargate SG-1 Specials",
  partOfCollections: ["show/stargate-sg-1"],
  position: 0,
  ownLength: 451.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2004-07-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-14607",
      externalLink: "https://trakt.tv/shows/stargate-sg-1/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.966Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
