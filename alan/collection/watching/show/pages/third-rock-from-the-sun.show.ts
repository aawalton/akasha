import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const thirdRockFromTheSun = {
  id: "01a06802-9330-7000-85f2-ecb3e75c4bf8",
  type: "page-type/show",
  slug: "third-rock-from-the-sun",
  title: "3rd Rock from the Sun",
  partOfCollections: ["show-collection/comedy-shows"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1996-01-09",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "3rd-rock-from-the-sun",
      externalLink: "https://trakt.tv/shows/3rd-rock-from-the-sun",
      lastSyncedAt: "2025-12-20",
    },
    { source: "tmdb", externalId: "155", externalLink: "https://www.themoviedb.org/tv/155" },
  ],
  createdAt: "2026-09-03T16:03:14.352Z",
  updatedAt: "2026-10-29T15:48:20.891Z",
} as const satisfies Show
