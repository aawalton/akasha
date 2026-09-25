import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const starTrekPicardSpecials = {
  id: "01a06802-b8bd-700c-b70e-7b65e10a2a25",
  type: "page-type/season",
  slug: "star-trek-picard-specials",
  title: "Star Trek: Picard Specials",
  partOfCollections: ["show/star-trek-picard"],
  position: 0,
  ownLength: 481.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2020-10-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-267674",
      externalLink: "https://trakt.tv/shows/star-trek-picard/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
