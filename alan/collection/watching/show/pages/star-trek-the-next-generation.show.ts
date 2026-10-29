import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const starTrekTheNextGeneration = {
  id: "01a06802-9332-7030-a2a0-00e89b525515",
  type: "page-type/show",
  slug: "star-trek-the-next-generation",
  title: "Star Trek: The Next Generation",
  partOfCollections: ["fandom/star-trek-3"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "paused",
  grade: "B",
  publishedAt: "1987-09-28",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-trek-the-next-generation",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "655", externalLink: "https://www.themoviedb.org/tv/655" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:42:10.189Z",
} as const satisfies Show
