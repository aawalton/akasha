import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const stargateAtlantisSpecials = {
  id: "01a06802-b8bd-7049-9594-e820097dda5d",
  type: "page-type/season",
  slug: "stargate-atlantis-specials",
  title: "Stargate Atlantis Specials",
  partOfCollections: ["show/stargate-atlantis"],
  position: 0,
  ownLength: 847.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2004-07-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-7509",
      externalLink: "https://trakt.tv/shows/stargate-atlantis/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.965Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
