import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const sheHulkAttorneyAtLaw = {
  id: "01a06802-9332-7021-a720-a02b3dbf6047",
  type: "page-type/show",
  slug: "she-hulk-attorney-at-law",
  title: "She-Hulk: Attorney at Law",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 37,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-08-18",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/she-hulk-attorney-at-law",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "92783", externalLink: "https://www.themoviedb.org/tv/92783" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T16:30:26.136Z",
} as const satisfies Show
