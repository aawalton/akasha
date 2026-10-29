import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const starTrekVoyager = {
  id: "01a06802-9332-7031-ab2c-cba2b6aafdb9",
  type: "page-type/show",
  slug: "star-trek-voyager",
  title: "Star Trek: Voyager",
  partOfCollections: ["fandom/star-trek-3"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1995-01-17",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-voyager",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "1855", externalLink: "https://www.themoviedb.org/tv/1855" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:42:27.464Z",
} as const satisfies Show
