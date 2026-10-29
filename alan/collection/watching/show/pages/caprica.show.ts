import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const caprica = {
  id: "01a06802-9331-700e-8261-11fd1d9ad165",
  type: "page-type/show",
  slug: "caprica",
  title: "Caprica",
  partOfCollections: ["fandom/battlestar-galactica"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2010-01-23",
  externalIdentity: [
    { source: "trakt", externalLink: "https://trakt.tv/shows/caprica", lastSyncedAt: "2025-10-01" },
    { source: "tmdb", externalId: "877", externalLink: "https://www.themoviedb.org/tv/877" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:25:16.463Z",
} as const satisfies Show
