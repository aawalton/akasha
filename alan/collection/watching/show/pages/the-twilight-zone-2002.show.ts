import type { Show } from "akasha/alan/collection/watching/show/show.page-type.types.ts"

export const theTwilightZone2002 = {
  id: "01a06802-9333-7005-9282-97eed6280ff3",
  type: "page-type/show",
  slug: "the-twilight-zone-2002",
  title: "The Twilight Zone (2002)",
  partOfCollections: ["show-collection/the-twilight-zone"],
  position: 2002,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-started",
  publishedAt: "2002-09-19",
  externalIdentity: [
    {
      source: "trakt",
      externalId: "the-twilight-zone-2002",
      externalLink: "https://trakt.tv/shows/the-twilight-zone-2002",
      lastSyncedAt: "2025-10-30",
    },
    { source: "tmdb", externalId: "16399", externalLink: "https://www.themoviedb.org/tv/16399" },
  ],
  createdAt: "2026-09-03T16:03:14.355Z",
  updatedAt: "2026-10-29T15:47:51.887Z",
} as const satisfies Show
