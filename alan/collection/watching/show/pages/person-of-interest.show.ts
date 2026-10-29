import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const personOfInterest = {
  id: "01a06802-9332-7016-86c3-6bc4582323ae",
  type: "page-type/show",
  slug: "person-of-interest",
  title: "Person of Interest",
  partOfCollections: ["show-collection/science-fiction-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2011-09-23",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/person-of-interest",
      lastSyncedAt: "2025-10-13",
    },
    { source: "tmdb", externalId: "1411", externalLink: "https://www.themoviedb.org/tv/1411" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:39:48.082Z",
} as const satisfies Show
