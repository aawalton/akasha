import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theTwilightZone1959 = {
  id: "01a06802-9333-7003-b0d4-7801c22153ab",
  type: "page-type/show",
  slug: "the-twilight-zone-1959",
  title: "The Twilight Zone (1959)",
  partOfCollections: ["show-collection/the-twilight-zone"],
  position: 1959,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "1959-10-03",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "the-twilight-zone-1959",
      externalLink: "https://trakt.tv/shows/the-twilight-zone-1959",
      lastSyncedAt: "2025-10-30",
    },
    { source: "tmdb", externalId: "6357", externalLink: "https://www.themoviedb.org/tv/6357" },
  ],
  createdAt: "2026-09-03T16:03:14.355Z",
  updatedAt: "2026-10-29T15:47:33.325Z",
} as const satisfies Show
