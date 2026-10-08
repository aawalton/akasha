import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const capricaSpecials = {
  id: "01a06802-b8b8-7024-a2bc-093c94fbd674",
  type: "page-type/season",
  slug: "caprica-specials",
  title: "Caprica Specials",
  partOfCollections: ["show/caprica"],
  position: 0,
  ownLength: 61.2,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2009-04-22",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-2810",
      externalLink: "https://trakt.tv/shows/caprica/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
  createdAt: "2026-09-03T16:03:23.960Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Season
