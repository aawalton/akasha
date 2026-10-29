import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const k9 = {
  id: "01a06802-9332-7006-a7c1-5478b0adcc79",
  type: "page-type/show",
  slug: "k-9",
  title: "K-9",
  partOfCollections: ["fandom/doctor-who"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2009-10-31",
  externalIdentity: [
    { source: "trakt", externalLink: "https://trakt.tv/shows/k-9", lastSyncedAt: "2025-10-01" },
    { source: "tmdb", externalId: "25831", externalLink: "https://www.themoviedb.org/tv/25831" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:31:55.079Z",
} as const satisfies Show
