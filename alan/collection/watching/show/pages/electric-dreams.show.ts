import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const electricDreams = {
  id: "01a06802-9331-7020-98bd-43d4780b387d",
  type: "page-type/show",
  slug: "electric-dreams",
  title: "Electric Dreams",
  partOfCollections: ["show-collection/speculative-antholoagies"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2017-09-17",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/philip-k-dick-s-electric-dreams",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "31277", externalLink: "https://www.themoviedb.org/tv/31277" },
  ],
  createdAt: "2026-09-03T16:03:14.353Z",
  updatedAt: "2026-10-29T15:29:48.509Z",
} as const satisfies Show
