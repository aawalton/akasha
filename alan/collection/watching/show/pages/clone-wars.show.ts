import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const cloneWars = {
  id: "01a06802-9331-7012-bb53-8b3246658970",
  type: "page-type/show",
  slug: "clone-wars",
  title: "Clone Wars",
  partOfCollections: ["fandom/star-wars-2"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2003-11-07",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/star-wars-clone-wars",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "4194", externalLink: "https://www.themoviedb.org/tv/4194" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:25:45.098Z",
} as const satisfies Show
