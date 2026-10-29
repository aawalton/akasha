import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const starTrek2 = {
  id: "01a06802-9332-7026-ae57-05557f79b639",
  type: "page-type/show",
  slug: "star-trek-2",
  title: "Star Trek",
  partOfCollections: ["fandom/star-trek-3"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  grade: "B",
  publishedAt: "1966-09-08",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek",
      lastSyncedAt: "2025-10-02",
    },
    { source: "tmdb", externalId: "253", externalLink: "https://www.themoviedb.org/tv/253" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T16:30:44.613Z",
} as const satisfies Show
