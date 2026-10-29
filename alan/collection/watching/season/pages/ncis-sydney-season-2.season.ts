import type { Season } from "akasha/alan/collection/watching/season/season.page-type.types.ts"

export const ncisSydneySeason2 = {
  id: "01a06802-b8bb-7039-bd76-95e685009033",
  type: "page-type/season",
  slug: "ncis-sydney-season-2",
  title: "NCIS: Sydney Season 2",
  partOfCollections: ["show/ncis-sydney"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-02-07",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "trakt-season-425462",
      externalLink: "https://trakt.tv/shows/ncis-sydney/seasons/2",
      lastSyncedAt: "2025-10-02",
    },
  ],
  createdAt: "2026-09-03T16:03:23.963Z",
  updatedAt: "2026-10-29T15:33:25.376Z",
} as const satisfies Season
