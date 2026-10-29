import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const xMen97 = {
  id: "01a06802-9333-7010-aff3-98b0600132c8",
  type: "page-type/show",
  slug: "x-men-97",
  title: "X-Men '97",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 49,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2024-03-20",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/x-men-97",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "138502", externalLink: "https://www.themoviedb.org/tv/138502" },
  ],
  createdAt: "2026-09-03T16:03:14.355Z",
  updatedAt: "2026-10-29T15:49:17.956Z",
} as const satisfies Show
