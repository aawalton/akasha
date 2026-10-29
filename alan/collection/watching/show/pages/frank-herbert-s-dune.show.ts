import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const frankHerbertSDune = {
  id: "01a06802-9331-7026-8d4c-fbf74857c382",
  type: "page-type/show",
  slug: "frank-herbert-s-dune",
  title: "Frank Herbert's Dune",
  partOfCollections: ["fandom/dune-2"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2000-12-03",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/frank-herbert-s-dune",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "19566", externalLink: "https://www.themoviedb.org/tv/19566" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:30:09.692Z",
} as const satisfies Show
