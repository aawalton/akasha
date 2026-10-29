import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const torchwood = {
  id: "01a06802-9333-700a-8b80-9b6c0238af99",
  type: "page-type/show",
  slug: "torchwood",
  title: "Torchwood",
  partOfCollections: ["fandom/doctor-who"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2006-10-22",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/torchwood",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "424", externalLink: "https://www.themoviedb.org/tv/424" },
  ],
  createdAt: "2026-09-03T16:03:14.355Z",
  updatedAt: "2026-10-29T15:48:31.976Z",
} as const satisfies Show
