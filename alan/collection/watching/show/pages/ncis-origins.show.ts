import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const ncisOrigins = {
  id: "01a06802-9332-7010-8b0b-c351e681cc37",
  type: "page-type/show",
  slug: "ncis-origins",
  title: "NCIS: Origins",
  partOfCollections: ["show-collection/ncis-2"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-10-14",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/ncis-origins",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "243006", externalLink: "https://www.themoviedb.org/tv/243006" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:33:20.328Z",
} as const satisfies Show
