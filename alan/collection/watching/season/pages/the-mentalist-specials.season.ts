import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const theMentalistSpecials = {
  id: "01a06802-b8bf-7023-828e-0925dce21d89",
  type: "page-type/season",
  slug: "the-mentalist-specials",
  title: "The Mentalist Specials",
  partOfCollections: ["show/the-mentalist"],
  position: 0,
  ownLength: 39,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2009-08-21",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "0",
      externalLink: "https://trakt.tv/shows/the-mentalist/seasons/0",
      lastSyncedAt: "2026-01-01",
    },
  ],
} as const satisfies Season
