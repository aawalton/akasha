import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const msMarvel = {
  id: "01a06802-9332-700b-8722-e329ec7e146e",
  type: "page-type/show",
  slug: "ms-marvel",
  title: "Ms. Marvel",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 35,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2022-06-08",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/ms-marvel",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "92782", externalLink: "https://www.themoviedb.org/tv/92782" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T16:29:39.421Z",
} as const satisfies Show
