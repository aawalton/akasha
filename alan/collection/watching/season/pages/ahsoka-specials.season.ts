import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ahsokaSpecials = {
  id: "01a06802-b8b7-700e-8a19-a73bd4c5b494",
  type: "page-type/season",
  slug: "ahsoka-specials",
  title: "Ahsoka Specials",
  partOfCollections: ["show/ahsoka"],
  position: 0,
  ownLength: 46.8,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "archived",
  publishedAt: "2024-12-04",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-452255",
      externalLink: "https://trakt.tv/shows/ahsoka/seasons/0",
      lastSyncedAt: "2025-12-19",
    },
  ],
} as const satisfies Season
