import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const ironheart = {
  id: "01a06802-9332-7004-b436-5f6a0fdfa1fc",
  type: "page-type/show",
  slug: "ironheart",
  title: "Ironheart",
  partOfCollections: ["fandom/marvel-cinematic-universe"],
  position: 58,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2025-06-25",
  externalIdentity: [
    {
      source: "trakt",
      externalLink: "https://trakt.tv/shows/ironheart",
      lastSyncedAt: "2025-10-01",
    },
    { source: "tmdb", externalId: "114471", externalLink: "https://www.themoviedb.org/tv/114471" },
  ],
  createdAt: "2026-09-03T16:03:14.354Z",
  updatedAt: "2026-10-29T15:31:42.799Z",
} as const satisfies Show
