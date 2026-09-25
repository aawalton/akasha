import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const studioCSpecials = {
  id: "01a06802-b8be-7029-8d8e-a231487112ab",
  type: "page-type/season",
  slug: "studio-c-specials",
  title: "Studio C Specials",
  partOfCollections: ["show/studio-c"],
  position: 0,
  ownLength: 200,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2013-10-06",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "0",
      externalLink: "https://trakt.tv/shows/studio-c/seasons/0",
      lastSyncedAt: "2026-01-20",
    },
  ],
} as const satisfies Season
