import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const blackMirrorSpecials = {
  id: "01a06802-b8b8-700a-906e-824c6684127e",
  type: "page-type/season",
  slug: "black-mirror-specials",
  title: "Black Mirror Specials",
  partOfCollections: ["show/black-mirror"],
  position: 0,
  ownLength: 73.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2014-12-16",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-103681",
      externalLink: "https://trakt.tv/shows/black-mirror/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
