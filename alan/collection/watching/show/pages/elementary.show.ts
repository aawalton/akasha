import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const elementary = {
  id: "01a06802-9331-7021-98fc-a4ff176620c5",
  type: "page-type/show",
  slug: "elementary",
  title: "Elementary",
  partOfCollections: ["show-collection/crime-investigation-shows"],
  position: 10,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "completed",
  publishedAt: "2012-09-28",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/elementary",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "1415", externalLink: "https://www.themoviedb.org/tv/1415" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T16:29:06.597Z",
} as const satisfies Show
