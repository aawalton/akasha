import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const crusade = {
  id: "01a06802-9331-7016-9660-5f9b6da966e1",
  type: "page-type/show",
  slug: "crusade",
  title: "Crusade",
  partOfCollections: ["fandom/babylon-5-2"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1999-06-10",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "crusade",
      externalLink: "https://trakt.tv/shows/crusade",
      lastSyncedAt: "2025-12-20",
    },
    { source: "tmdb", externalId: "2120", externalLink: "https://www.themoviedb.org/tv/2120" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:27:16.829Z",
} as const satisfies Show
